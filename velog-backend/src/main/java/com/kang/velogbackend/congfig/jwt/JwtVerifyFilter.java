package com.kang.velogbackend.congfig.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kang.velogbackend.congfig.auth.PrincipalDetails;
import com.kang.velogbackend.domain.user.User;
import com.kang.velogbackend.domain.user.UserRepository;
import com.kang.velogbackend.web.dto.CMRespDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

//권한이나 인증이 필요한 주소에 요청은 무조건 이 필터를 탐.
public class JwtVerifyFilter extends BasicAuthenticationFilter { //@Componet가 안 되어있기 때문에 직접 DI 가 안된다.

    private static final Logger log =LoggerFactory.getLogger(JwtVerifyFilter.class);

    private final AuthenticationManager authenticationManager; //생성자를 이용
    private final UserRepository userRepository;
    ObjectMapper om = new ObjectMapper();

    public JwtVerifyFilter(AuthenticationManager authenticationManager, UserRepository userRepository) {
        super(authenticationManager);
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        log.info("권한이나 인증이 필요한 요청이 들어옴");

        String header = request.getHeader("Authorization");
        log.info("Authorization는 "+header);

        //1차 거르기
        if(header == null || !header.startsWith("Bearer")) {
            chain.doFilter(request, response);
            return;
        }

        String token = request.getHeader("Authorization").replace("Bearer ",""); //띄어쓰기 생각해서 파싱해라!

        log.info("token은 " + token);


        Long userId = null;

        try {
            //검증1 (헤더+페이로드+시크릿을 HMAC512 해쉬한 값) == SIGNATURE
            //검증2 (만료시간 확인)
            DecodedJWT dJWT = JWT.require(Algorithm.HMAC512("홍길동")).build().verify(token);
            userId = dJWT.getClaim("userId").asLong();
            log.info(dJWT.toString() + userId);
        }catch (TokenExpiredException e){
            //accessToken이 만료됐다면,
            //response.sendError(HttpStatus.UNAUTHORIZED.value(), "accessToken 기간이 만료되었습니다.");
            //Handler에서 처리하는 게 더 깔끔한 걸 같긴 하지만 일단..
            CMRespDto<?> cmRespDto = new CMRespDto(-1,"token 기간만료",null);
            //String jsonData = om.writeValueAsString(cmRespDto);
            //Script.responseData(response, jsonData);

            //Script.responseError(response,cmRespDto);


            return;
        }


        if(userId != null){
            User userEntity = userRepository.findById(userId).orElseThrow(()->{
                return new IllegalArgumentException("id를 찾을 수 없습니다.");
            });
            PrincipalDetails principalDetails = new PrincipalDetails(userEntity);

            Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());


            SecurityContextHolder.getContext().setAuthentication(authentication);

            log.info("시큐리티에 저장된 객체: " + authentication);

        }


     // Authentication 객체를 강제로 만들고 그걸 세션에 저장!
        //Seting in your @AuthenticationPrincipal!!! 씨빠!!!! 여기서 set하는 거였네.. 아래처럼 하면 String으로 저장되는듯..
//        Authentication authentication =
//                new UsernamePasswordAuthenticationToken(principalDetails.getUsername(), principalDetails.getPassword(), principalDetails.getAuthorities());

// JWT 토큰 서명을 통해서 서명이 정상이면 Authentication 객체를 만들어 준다. 요렇게 해야, @AuthenticationPrincipal principalDetails 형테로


        chain.doFilter(request, response);
    }
}
