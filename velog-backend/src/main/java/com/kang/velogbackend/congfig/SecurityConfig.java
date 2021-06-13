package com.kang.velogbackend.congfig;

import com.kang.velogbackend.congfig.jwt.JwtLoginFilter;
import com.kang.velogbackend.congfig.jwt.JwtVerifyFilter;
import com.kang.velogbackend.domain.user.UserRepository;
import com.kang.velogbackend.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;



@EnableGlobalMethodSecurity(prePostEnabled=true) // 특정 주소로 접근을 하면 권한 및 인증을 미리 체크하겠다는 뜻.
@RequiredArgsConstructor
@EnableWebSecurity
@Configuration // ioc 등록
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Bean
    public BCryptPasswordEncoder encode() {
        return new BCryptPasswordEncoder();
    }
    private final UserRepository userRepository;

    private final JwtUtil jwtUtil;

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http
                .cors().configurationSource(corsConfigurationSource())//@CrossOrigin(인증X), 시큐리티 필터에 등록 인증(O)
                .and()
                .csrf().disable()
                .addFilter(new JwtLoginFilter(authenticationManager(), jwtUtil))
                .addFilter(new JwtVerifyFilter(authenticationManager(), userRepository))
                .formLogin().disable()
                .httpBasic().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)// STATELESS: session을 사용하지 않겠다는 의미
                .and()
                .authorizeRequests()
                .antMatchers("/user/**").access("hasRole('ROLE_USER') OR hasRole('ROLE_ADMIN')")
                .anyRequest().permitAll();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true); //내서버가 응답을 할 때 json을 자바스크립트에서 처리할 수 있게 할지를 설정
        config.addAllowedOrigin("*"); //모든 ip에 응답을 허용하겠다.
        config.addAllowedMethod("*"); // 모든 post,get,put,delete, patch ..요청을 허용하겠다.
        config.addAllowedHeader("*"); //모든 header에 응답을 허용하겠다.
        config.addExposedHeader("Authorization");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
