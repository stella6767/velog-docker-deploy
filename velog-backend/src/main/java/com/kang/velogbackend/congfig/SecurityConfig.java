package com.kang.velogbackend.congfig;

import com.kang.velogbackend.congfig.jwt.JwtAccessDeniedHandler;
import com.kang.velogbackend.congfig.jwt.JwtAuthenticationEntryPoint;
import com.kang.velogbackend.congfig.jwt.JwtLoginFilter;
import com.kang.velogbackend.congfig.jwt.JwtVerifyFilter;
import com.kang.velogbackend.domain.user.UserRepository;
import com.kang.velogbackend.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;



@EnableGlobalMethodSecurity(prePostEnabled=true) // 특정 주소로 접근을 하면 권한 및 인증을 미리 체크하겠다는 뜻.
@RequiredArgsConstructor
@EnableWebSecurity //시큐리티 활성화
@Configuration // ioc 등록
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Bean
    public BCryptPasswordEncoder encode() {
        return new BCryptPasswordEncoder();
    }
    private final UserRepository userRepository;

    private final JwtUtil jwtUtil;
   // private final AuthenticationManager authenticationManager;


    @Override
    public void configure(WebSecurity web) throws Exception {
        super.configure(web);

       web.ignoring().antMatchers("/auth/reissue"); //아예 BasicAuthenticationFilter 자체를 안 타게 할 수 있음.
        //시큐리티를 완전 무시함. 토큰 재발급 요청을 할 때에


    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http
                .cors().configurationSource(corsConfigurationSource())//@CrossOrigin(인증X), 시큐리티 필터에 등록 인증(O)
                .and()
                .csrf().disable() //rest api이므로 csrf 보안이 필요없으므로 disable처리.
                .addFilter(new JwtLoginFilter(authenticationManager(), jwtUtil))
                .addFilter(new JwtVerifyFilter(authenticationManager(), userRepository))
                .formLogin().disable()
                .httpBasic().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)// STATELESS: session을 사용하지 않겠다는 의미



                .and()
                .authorizeRequests()
                .antMatchers("/user/**").access("hasRole('ROLE_USER') OR hasRole('ROLE_ADMIN')")
                .antMatchers("/admin/**").access("hasRole('ROLE_ADMIN')")
                .anyRequest().permitAll() //이게 아닌가..


                .and()
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint()) //로그인 에러
                .accessDeniedHandler(jwtAccessDeniedHandler()); //권한이 없을 때

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


    @Bean
    public JwtAccessDeniedHandler jwtAccessDeniedHandler(){
        JwtAccessDeniedHandler jwtAccessDeniedHandler = new JwtAccessDeniedHandler();

        return jwtAccessDeniedHandler;
    }


    @Bean
    public JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint(){
        JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint = new JwtAuthenticationEntryPoint();

        return jwtAuthenticationEntryPoint;
    }




}
