package com.kang.velogbackend.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.kang.velogbackend.congfig.auth.PrincipalDetails;
import com.kang.velogbackend.service.RedisService;
import com.kang.velogbackend.web.dto.auth.LoginRespDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtUtil {

    public final static int ACCESS_TOKEN_VALIDATION_SECOND = 1000*60*1; //3분
    public final static int REFRESH_TOKEN_VALIDATION_SECOND = 1000*60*60*24*7; //1주

    final static public String ACCESS_TOKEN_NAME = "accessToken";
    final static public String REFRESH_TOKEN_NAME = "refreshToken";

    @Value("${jwt.secret}")
    private String SECRET_KEY; //doc에 보면 raw secret value를 써야된단다. 이거 못 씀...

    private final RedisService redisService;


    public LoginRespDto makeLoginRespDto(PrincipalDetails principalDetails, String accessToken, String refreshToken){

        LoginRespDto loginRespDto = new LoginRespDto();
        loginRespDto = loginRespDto.builder()
                .id(principalDetails.getUser().getId())
                .picture(principalDetails.getUser().getPicture())
                .email(principalDetails.getUser().getEmail())
                .username(principalDetails.getUser().getUsername())
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();

        return loginRespDto;
    }



    public void saveTokenInRedis(String key, String value){  //refreshToken을 reids에 저장
        //UUID uuid = UUID.randomUUID(); //고유키값 만들기
        redisService.setDataExpire(key,value, REFRESH_TOKEN_VALIDATION_SECOND);
    }


    public String generateAccessToken(Long userId) {
        return doGenerateToken(userId, ACCESS_TOKEN_VALIDATION_SECOND, ACCESS_TOKEN_NAME);
    }

    public String generateRefreshToken(Long userId) {
        return doGenerateToken(userId, REFRESH_TOKEN_VALIDATION_SECOND, REFRESH_TOKEN_NAME);
    }

    public String doGenerateToken(Long userId, long expireTime, String tokenName) {

        String jwtToken = JWT.create()
                .withSubject(tokenName) //토큰이름
                .withExpiresAt(new Date(System.currentTimeMillis()+(expireTime)))
                .withClaim("userId", userId)
                .sign(Algorithm.HMAC512("홍길동"));

        return jwtToken;
    }






}
