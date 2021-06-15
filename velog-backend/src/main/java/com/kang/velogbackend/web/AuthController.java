package com.kang.velogbackend.web;


import com.kang.velogbackend.congfig.auth.PrincipalDetails;
import com.kang.velogbackend.congfig.oauth.GoogleInfo;
import com.kang.velogbackend.congfig.oauth.OAuth2UserInfo;
import com.kang.velogbackend.service.AuthService;
import com.kang.velogbackend.service.RedisService;
import com.kang.velogbackend.utils.JwtUtil;
import com.kang.velogbackend.web.dto.CMRespDto;
import com.kang.velogbackend.web.dto.auth.AuthReqDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RequiredArgsConstructor
@RestController
public class AuthController {

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);
    private final AuthService authService;
    private final BCryptPasswordEncoder encoder;
    private final RedisService redisService;
    private final JwtUtil jwtUtil;

    @PostMapping("/auth/join") //Oauth 가 아닌
    public CMRespDto<?> join(@RequestBody AuthReqDto authReqDto) {
        log.info(authReqDto.toString());//@RequestBody가 받을 수 있는 application/json 설정을 프론트엔드 쪽에서 꼭 해주라ㅠㅠ

        //이미 존재하는 닉네임 상관없이..
        //authService.회원가입(authReqDto.toEntity());
        //utils 함수로 프론트서버로 자바스크립트 함수를 던져주는 것보다는 이게 그냥 제이슨 객체를 던지는 게 나을듯.

        return new CMRespDto<>(1, "회원가입 성공", null);
    }


    //access토큰 재발급 요청
    @PostMapping("/auth/reissue")
    public CMRespDto<?> reissue(String refreshToken, @AuthenticationPrincipal PrincipalDetails principalDetails){
        log.info("token 재발급 요청 옴 "+ refreshToken);
        String redisUserId = redisService.getData(refreshToken);

        if(redisUserId != null){

            log.info("원래 유저 아디 "+redisUserId);
            String accessToken = jwtUtil.generateAccessToken(Long.parseLong(redisUserId));

            return new CMRespDto<>(1,"재발급 성공", jwtUtil.makeLoginRespDto(principalDetails,accessToken,refreshToken));
        }

        return new CMRespDto<>(-1,"토큰이 만료되었습니다. 다시 로그인해주세요.",null);
    }


    //예외적으로 Restful 주소 형식에 안 맞게끔
    @PostMapping("/logout")
    public CMRespDto<?> logout(String refreshToken){
        log.info("로그아웃 요청이 옴. 그냥 검증없이 지우는 게 나을까?");
        redisService.deleteData(refreshToken);

        return new CMRespDto<>(1,"로그아웃되었습니다.",null);
    }




    //소셜 로그인
    @PostMapping("/auth/join/google")
    public String jwtCreate(@RequestBody Map<String, Object> data) {
        log.info("jwtCreate 실행됨");
        //log.info(data.get("profileObj"));

        OAuth2UserInfo googleUser =
                new GoogleInfo((Map<String, Object>)data.get("profileObj"));

//        User userEntity =
//                userRepository.findByUsername(googleUser.getProvider()+"_"+googleUser.getProviderId());
//
//        if(userEntity == null) {
//            User userRequest = User.builder()
//                    .username(googleUser.getProvider()+"_"+googleUser.getProviderId())
//                    .password(bCryptPasswordEncoder.encode("강민규"))
//                    .email(googleUser.getEmail())
//                    .provider(googleUser.getProvider())
//                    .providerId(googleUser.getProviderId())
//                    .roles("ROLE_USER")
//                    .build();
//
//            userEntity = userRepository.save(userRequest);
//        }
//
//        String jwtToken = JWT.create()
//                .withSubject(userEntity.getUsername())
//                .withExpiresAt(new Date(System.currentTimeMillis()+JwtProperties.EXPIRATION_TIME))
//                .withClaim("id", userEntity.getId())
//                .withClaim("username", userEntity.getUsername())
//                .sign(Algorithm.HMAC512(JwtProperties.SECRET));

//        return jwtToken;
        return null;
    }
}

