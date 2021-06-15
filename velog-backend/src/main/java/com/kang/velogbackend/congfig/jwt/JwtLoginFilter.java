package com.kang.velogbackend.congfig.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kang.velogbackend.congfig.auth.PrincipalDetails;
import com.kang.velogbackend.utils.JwtUtil;
import com.kang.velogbackend.web.dto.CMRespDto;
import com.kang.velogbackend.web.dto.auth.AuthReqDto;
import com.kang.velogbackend.web.dto.auth.LoginRespDto;
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
import java.io.PrintWriter;
import java.util.Date;


//토큰 만들어주기
@RequiredArgsConstructor
public class JwtLoginFilter extends UsernamePasswordAuthenticationFilter {
    //formlogin을 disable했기 때문에 꼭 이 필터를 수정해서 등록시켜줘야함

    private final AuthenticationManager authenticationManager;
    private static final Logger log = LoggerFactory.getLogger(JwtLoginFilter.class);
    private final JwtUtil jwtUtil;

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

    @Override //JWT 토큰 만들어서 응답
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {

        //principalDetails 객체를 받아오고
        System.out.println("로그인 완료되어서 세션 만들어짐. 이제 JWT토큰 만들어서 response.header에 응답할 차리");
        PrincipalDetails principalDetails = (PrincipalDetails)authResult.getPrincipal();

       //이를 활용해 refresh token과 accessToken을 만들고
        String accessToken = jwtUtil.generateAccessToken(principalDetails.getUser().getId());
        String refreshToken = jwtUtil.generateRefreshToken(principalDetails.getUser().getId());
        log.info("accessToken 만료시간: "+ new Date(System.currentTimeMillis()+(1000*60*10)));
        log.info("refreshToken 만료시간: "+ new Date(System.currentTimeMillis()+(1000*60*60*24*7)));


        //이제 이 토큰들을 가지고, LoginRespDTO에 넣어줌
        LoginRespDto loginRespDto = new LoginRespDto();
        loginRespDto = loginRespDto.builder()
                .id(principalDetails.getUser().getId())
                .picture(principalDetails.getUser().getPicture())
                .email(principalDetails.getUser().getEmail())
                .username(principalDetails.getUser().getUsername())
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();


        //이 DTO를 JSON으로 변환 후 BODY로 클라이언트에게 응답
        ObjectMapper om = new ObjectMapper();
        log.info("loginRespDto: "+om.writeValueAsString(loginRespDto));
        CMRespDto<?> cmRespDto = new CMRespDto(1,"로그인성공",loginRespDto);
        //response.setHeader("Authorization", "Bearer "+accessToken);
        String jsonData = om.writeValueAsString(cmRespDto);
        log.info("로그인 응답 데이터: " + jsonData);

        response.setHeader("Content-Type", "application/json; charset=utf-8");

        PrintWriter out = response.getWriter();
        out.print(jsonData);
        out.flush();



    }

}