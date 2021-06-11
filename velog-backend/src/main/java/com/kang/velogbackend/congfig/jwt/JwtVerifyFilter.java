package com.kang.velogbackend.congfig.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.kang.velogbackend.congfig.auth.PrincipalDetails;
import com.kang.velogbackend.domain.user.User;
import com.kang.velogbackend.domain.user.UserRepository;
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

        if(header == null || !header.startsWith("Bearer")) {
            chain.doFilter(request, response);
            return;
        }

        String token = request.getHeader("Authorization").replace("Bearer ",""); //띄어쓰기 생각해서 파싱해라!

        log.info("token은 " + token);

        //검증1 (헤더+페이로드+시크릿을 HMAC512 해쉬한 값) == SIGNATURE
        //검증2 (만료시간 확인)
        DecodedJWT dJWT = JWT.require(Algorithm.HMAC512("홍길동")).build().verify(token);
        Long userId = dJWT.getClaim("userId").asLong();

        log.info(dJWT.toString() + userId);


        User userEntity = userRepository.findById(userId).orElseThrow(()->{
            return new IllegalArgumentException("id를 찾을 수 없습니다.");
        });
        PrincipalDetails principalDetails = new PrincipalDetails(userEntity);
        // Authentication 객체를 강제로 만들고 그걸 세션에 저장!
        Authentication authentication =
                new UsernamePasswordAuthenticationToken(principalDetails.getUsername(), principalDetails.getPassword(), principalDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);




        chain.doFilter(request, response);
    }
}
