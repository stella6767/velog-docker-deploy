package com.kang.velogbackend.web;


import com.kang.velogbackend.congfig.auth.PrincipalDetails;
import com.kang.velogbackend.congfig.oauth.GoogleInfo;
import com.kang.velogbackend.congfig.oauth.OAuth2UserInfo;
import com.kang.velogbackend.domain.user.User;
import com.kang.velogbackend.domain.user.UserRepository;
import com.kang.velogbackend.service.AuthService;
import com.kang.velogbackend.service.RedisService;
import com.kang.velogbackend.utils.CookieUtill;
import com.kang.velogbackend.utils.JwtUtil;
import com.kang.velogbackend.web.dto.CMRespDto;
import com.kang.velogbackend.web.dto.auth.AuthReqDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class AuthController {

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);
    private final AuthService authService;
    private final RedisService redisService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final CookieUtill cookieUtill;

    @PostMapping("/auth/join") //Oauth 가 아닌
    public CMRespDto<?> join(@RequestBody AuthReqDto authReqDto) {
        log.info(authReqDto.toString());//@RequestBody가 받을 수 있는 application/json 설정을 프론트엔드 쪽에서 꼭 해주라ㅠㅠ

        //이미 존재하는 닉네임 상관없이..
        //authService.회원가입(authReqDto.toEntity());
        //utils 함수로 프론트서버로 자바스크립트 함수를 던져주는 것보다는 이게 그냥 제이슨 객체를 던지는 게 나을듯.

        return new CMRespDto<>(1, "회원가입 성공", null);
    }


    @PostMapping("/login")
    public CMRespDto<?> login(@RequestBody AuthReqDto authReqDto, HttpServletRequest request, HttpServletResponse response) throws IOException {
        log.info("로그인 요청 옴");

        User principal = userRepository.findByUsername(authReqDto.getUsername());

        if(principal != null){

            PrincipalDetails principalDetails = new PrincipalDetails(principal);
            Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);

            final String token = jwtUtil.generateAccessToken(principal.getId());
            final String refreshJwt = jwtUtil.generateRefreshToken(principal.getId());

            //cookie로 만듬
            Cookie accessToken = cookieUtill.createCookie(JwtUtil.ACCESS_TOKEN_NAME, token);
            Cookie refreshToken = cookieUtill.createCookie(JwtUtil.REFRESH_TOKEN_NAME, refreshJwt);

            //RefreshToken을 Redis에 저장
            jwtUtil.saveTokenInRedis(refreshJwt, principal.getId().toString());

            log.info("refreshToken: " + refreshToken); //쿠키

            //이제 이 쿠키를 클라이언트 서버로
            response.addCookie(accessToken);
            response.addCookie(refreshToken);

            return new CMRespDto<>(1,"로그인성공",jwtUtil.makeLoginRespDto(principal));

        }else{
            //response.sendError(HttpStatus.UNAUTHORIZED.value(),"유저정보를 찾을 수 없습니다.");
            return new CMRespDto<>(-1,"로그인에러",null);
        }


    }






//    //예외적으로 Restful 주소 형식에 안 맞게끔
//    @PostMapping("/logout")
//    public CMRespDto<?> logout(@RequestBody String refreshToken){
//        log.info("로그아웃 요청이 옴. 그냥 검증없이 지우는 게 나을까?");
//        String key = Script.parseString(refreshToken);
//        //String key = refreshToken.substring(1, refreshToken.length()-1);
//        log.info("파싱된 token:  "+ key);
//        redisService.deleteData(key);
//
//        return new CMRespDto<>(1,"로그아웃되었습니다.",null);
//    }




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

