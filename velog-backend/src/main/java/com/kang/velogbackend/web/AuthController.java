package com.kang.velogbackend.web;


import com.kang.velogbackend.congfig.oauth.GoogleInfo;
import com.kang.velogbackend.congfig.oauth.OAuth2UserInfo;
import com.kang.velogbackend.service.AuthService;
import com.kang.velogbackend.web.dto.CMRespDto;
import com.kang.velogbackend.web.dto.auth.AuthReqDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@CrossOrigin
@RequiredArgsConstructor
@RestController
public class AuthController {

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);
    private final AuthService authService;
    private final BCryptPasswordEncoder encoder;

    @PostMapping("/auth/join") //Oauth 가 아닌
    public CMRespDto<?> join(@RequestBody AuthReqDto authReqDto) {

        log.info(authReqDto.toString());

        //User user = authReqDto.toEntity();

        //return new CMRespDto<>(1, "회원가입 성공", authService.회원가입(user));
        return new CMRespDto<>(1, "회원가입 성공", null);
    }



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

