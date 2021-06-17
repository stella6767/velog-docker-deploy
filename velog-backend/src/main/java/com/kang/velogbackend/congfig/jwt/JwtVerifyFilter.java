package com.kang.velogbackend.congfig.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kang.velogbackend.congfig.auth.PrincipalDetails;
import com.kang.velogbackend.domain.user.User;
import com.kang.velogbackend.domain.user.UserRepository;
import com.kang.velogbackend.service.RedisService;
import com.kang.velogbackend.utils.CookieUtill;
import com.kang.velogbackend.utils.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

//권한이나 인증이 필요한 주소에 요청은 무조건 이 필터를 탐.
public class JwtVerifyFilter extends BasicAuthenticationFilter { //@Componet가 안 되어있기 때문에 직접 DI 가 안된다.

    private static final Logger log =LoggerFactory.getLogger(JwtVerifyFilter.class);

    private final AuthenticationManager authenticationManager; //생성자를 이용
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final CookieUtill cookieUtill;
    private final RedisService redisService;


    ObjectMapper om = new ObjectMapper();

    public JwtVerifyFilter(AuthenticationManager authenticationManager, UserRepository userRepository, JwtUtil jwtUtil, CookieUtill cookieUtill, RedisService redisService) {
        super(authenticationManager);
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.cookieUtill = cookieUtill;
        this.redisService = redisService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        log.info("권한이나 인증이 필요한 요청이 들어옴");

        final Cookie jwtToken = cookieUtill.getCookie(request, JwtUtil.ACCESS_TOKEN_NAME);


        Long userId = null;
        String jwt = null;
        String refreshJwt = null;
        String refreshUserId = null;


        try {

            if(jwtToken != null){
                jwt = jwtToken.getValue();
                userId = jwtUtil.getUserId(jwt);
            }
            if(userId!=null){
                User userEntity = userRepository.findById(userId).orElseThrow(()->{
                    return new IllegalArgumentException("id를 찾을 수 없습니다.");
                });

                PrincipalDetails principalDetails = new PrincipalDetails(userEntity);
                Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }catch (ExpiredJwtException e){
            Cookie refreshToken = cookieUtill.getCookie(request,JwtUtil.REFRESH_TOKEN_NAME);
            if(refreshToken!=null){
                refreshJwt = refreshToken.getValue();
            }
        }catch(Exception e){

        }


        try{
            if(refreshJwt != null){
                refreshUserId = redisService.getData(refreshJwt);

                if(refreshUserId.equals(jwtUtil.getUserId(refreshJwt))){

                    User userEntity = userRepository.findById(userId).orElseThrow(()->{
                        return new IllegalArgumentException("id를 찾을 수 없습니다.");
                    });

                    PrincipalDetails principalDetails = new PrincipalDetails(userEntity);
                    Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);


                    String newToken =jwtUtil.generateAccessToken(userId);
                    Cookie newAccessToken = cookieUtill.createCookie(JwtUtil.ACCESS_TOKEN_NAME,newToken);
                    response.addCookie(newAccessToken);
                }
            }
        }catch(ExpiredJwtException e){

        }





        chain.doFilter(request, response);
    }
}
