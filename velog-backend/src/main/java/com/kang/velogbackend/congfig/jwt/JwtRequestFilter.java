package com.kang.velogbackend.congfig.jwt;

import com.kang.velogbackend.congfig.auth.PrincipalDetails;
import com.kang.velogbackend.congfig.auth.PrincipalDetailsService;
import com.kang.velogbackend.domain.user.User;
import com.kang.velogbackend.domain.user.UserRepository;
import com.kang.velogbackend.service.RedisService;
import com.kang.velogbackend.utils.CookieUtill;
import com.kang.velogbackend.utils.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@RequiredArgsConstructor
@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(JwtRequestFilter.class);

    private final PrincipalDetailsService principalDetailsService;
    private final JwtUtil jwtUtil;
    private final CookieUtill cookieUtill;
    private final RedisService redisService;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("무조건 이 필터를 탄다. 인증이 안 되면 그냥 다음 필터를 타도록 설정.");

        Cookie accessCookie = cookieUtill.getCookie(request, JwtUtil.ACCESS_TOKEN_NAME);
        Long userId = null;
        String accessToken = null;
        String refreshToken = null;
        String refreshUserId = null;

        try {
            if(accessCookie != null){
                log.info("accessCookie: "+accessCookie.toString());
                accessToken = accessCookie.getValue();
                userId = jwtUtil.getUserId(accessToken); //검증
                log.info("why.." + userId +" " +accessToken);
            }

            if(userId!=null){

                log.info(userId + " jwtAccessToken: " + accessToken);
                User userEntity = userRepository.findById(userId).orElseThrow(()->{
                    return new IllegalArgumentException("id를 찾을 수 없습니다.");
                });

                if(jwtUtil.validateToken(accessToken, userEntity)){
                    log.info("세션에 담고..");
                    PrincipalDetails principalDetails = new PrincipalDetails(userEntity);
                    Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        }catch (ExpiredJwtException e){

            try {
                log.info("accessToken 기간이 만료되었다면");
                Cookie refresCookie = cookieUtill.getCookie(request,JwtUtil.REFRESH_TOKEN_NAME);
                if(refresCookie != null){
                    refreshToken = refresCookie.getValue();
                    log.info("refreshToken: " + refreshToken);
                }
            } catch (Exception exception) {
                exception.printStackTrace();
                response.sendError(-1, "refresh 토큰이 만료. 다시 로그인 필요");
            }
        }

        try{
            if(refreshToken != null){
                //재발급
                refreshUserId = redisService.getData(refreshToken);
                log.info("refreshUserId: " + refreshUserId);
                String claimId = (jwtUtil.getUserId(refreshToken)).toString();

                if(claimId == null || refreshUserId == null){
                    log.info("");
                    filterChain.doFilter(request, response);
                }

                if(refreshUserId.equals(claimId)) {
                    log.info("2차 검증!");
                    log.info("refresh검증"  + claimId);

                    User userEntity = userRepository.findById(Long.parseLong(refreshUserId)).orElseThrow(()->{
                        return new IllegalArgumentException("id를 찾을 수 없습니다.");
                    });

                    log.info("세션에 다시 담는다.");

                    PrincipalDetails principalDetails = new PrincipalDetails(userEntity);
                    Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication); //세션에 다시 담고..


                    String newAccessToken =jwtUtil.generateAccessToken(Long.parseLong(refreshUserId));
                    Cookie newAccessCookie = cookieUtill.createCookie(JwtUtil.ACCESS_TOKEN_NAME,newAccessToken);

                    log.info("newToken: " + newAccessToken);

                    response.addCookie(newAccessCookie); //새로 발급한다.
                }
            }
        }catch(ExpiredJwtException e){
            //refreshToken조차 만료했다면..
            log.error(e.getMessage());
            //response.sendError(HttpStatus.UNAUTHORIZED.value(),"세션이 만료되었습니다. 다시 로그인하여주십시오.");
        }


        filterChain.doFilter(request,response);
    }



}
