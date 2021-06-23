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

        final Cookie jwtToken = cookieUtill.getCookie(request, JwtUtil.ACCESS_TOKEN_NAME);
        Long userId = null;
        String jwt = null;
        String refreshJwt = null;
        String refreshUserId = null;

        try {
            if(jwtToken != null){
                log.info("accessCookie: "+jwtToken.toString());
                jwt = jwtToken.getValue();
                userId = jwtUtil.getUserId(jwt); //검증

                log.info(userId + " jwtAccessToken: " + jwt);

            }else{
                //response.sendError(HttpStatus.UNAUTHORIZED.value(), "로그인이 필요한 서비스입니다."); // /login 자체를 못탐
            }

            if(userId!=null){
                User userEntity = userRepository.findById(userId).orElseThrow(()->{
                    return new IllegalArgumentException("id를 찾을 수 없습니다.");
                });

                if(jwtUtil.validateToken(jwt, userEntity)){
                    log.info("세션에 담고..");
                    PrincipalDetails principalDetails = new PrincipalDetails(userEntity);
                    Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        }catch (ExpiredJwtException e){

            log.info("accessToken 기간이 만료되었다면");
            Cookie refreshToken = cookieUtill.getCookie(request,JwtUtil.REFRESH_TOKEN_NAME);
            if(refreshToken!=null){
                refreshJwt = refreshToken.getValue();
                log.info("refreshToken: " + refreshJwt);
            }
        }catch(Exception e){
            log.error(e.getMessage());
        }


        try{
            if(refreshJwt != null){
                //재발급
                refreshUserId = redisService.getData(refreshJwt);
                log.info("refreshUserId: " + refreshUserId);
                String claimId = (jwtUtil.getUserId(refreshJwt)).toString();

                log.info("refresh검증"  + claimId);

                if(refreshUserId.equals(claimId)) {
                    log.info("2차 검증!");

                    User userEntity = userRepository.findById(Long.parseLong(refreshUserId)).orElseThrow(()->{
                        return new IllegalArgumentException("id를 찾을 수 없습니다.");
                    });

                    log.info("세션에 다시 담는다.");

                    PrincipalDetails principalDetails = new PrincipalDetails(userEntity);
                    Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication); //세션에 다시 담고..

                    String newToken =jwtUtil.generateAccessToken(userId);
                    Cookie newAccessToken = cookieUtill.createCookie(JwtUtil.ACCESS_TOKEN_NAME,newToken);
                    log.info("newToken: " + newToken);

                    response.addCookie(newAccessToken); //새로 발급한다.
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
