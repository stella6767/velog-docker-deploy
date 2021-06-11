package com.kang.velogbackend.congfig.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kang.velogbackend.congfig.auth.PrincipalDetails;
import com.kang.velogbackend.web.dto.auth.AuthReqDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;


//토큰 만들어주기
@RequiredArgsConstructor
public class JwtLoginFilter extends UsernamePasswordAuthenticationFilter {

    //formlogin을 disable했기 때문에 꼭 이 필터를 수정해서 등록시켜줘야함

    private static final Logger log = LoggerFactory.getLogger(JwtLoginFilter.class);
    private final AuthenticationManager authenticationManager;//시큐리티가 이미 ioc에 이 객체를 등록시켜놨음

    // 주소: Post 요청으로 /login 요청
    @Override   //기존 로그인 방식을 갈아치우는 과정
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {

        log.info("로그인 요청 옴");

        ObjectMapper om = new ObjectMapper();
        AuthReqDto authReqDto = null;

        try {
            authReqDto = om.readValue(request.getInputStream(), AuthReqDto.class); //json => java object
            log.info("로그인 dto: '{}'", authReqDto);
        } catch (Exception e) {
            log.warn("JwtLoginFilter : 로그인 요청 dto 생성 중 실패: '{}'", e.getMessage());
            //e.printStackTrace();
        }

        //1. UsernamePassword 토큰 만들기
        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(authReqDto.getUsername(),authReqDto.getPassword());

        //2. AuthenticationManager에게 토큰을 전달하면 -> 자동으로 UserDetailsService가 호출=> 응답 Authentication
        Authentication authentication = authenticationManager.authenticate(authToken);

        return authentication;
        //return 될 때 authentication객체가 session 영역에 저장됨.
        //굳이 세션을 만들 이유는 없지만, 권한 처리 때문에 session에 넣어주자.
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {
        //JWT 토큰 만들어서 응답
        System.out.println("로그인 완료되어서 세션 만들어짐. 이제 JWT토큰 만들어서 response.header에 응답할 차리");
        PrincipalDetails principalDetails = (PrincipalDetails)authResult.getPrincipal();

        //JWT 토큰은 보안 파일이 아님!! - 전자서명
        String jwtToken = JWT.create()
                .withSubject("velogToken") //토큰이름
                .withExpiresAt(new Date(System.currentTimeMillis()+(1000*60*10))) //만료시간 5분
                .withClaim("userId", principalDetails.getUser().getId())
                .sign(Algorithm.HMAC512("홍길동"));

        //refresh token redis 연동은 차차 생각해보자.. 더럽게 어렵네.


        System.out.println("jwtToken: "+jwtToken);
        response.setHeader("Authorization", "Bearer "+jwtToken); //이제 이 토큰을 가지고,

        //response.set

    }

}