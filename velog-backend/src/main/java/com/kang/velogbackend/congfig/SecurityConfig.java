package com.kang.velogbackend.congfig;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Bean
    public BCryptPasswordEncoder encode() {
        return new BCryptPasswordEncoder();
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.csrf().disable();
        http.authorizeRequests()
                .antMatchers("/admin/**").access("hasRole('ROLE_ADMIN')") //관리자만 들어올 수 있도록
                .anyRequest().permitAll()
                .and()
                .formLogin()//x-www-form-urlencoded, formlogin()은 json 던지면 못 받음
                .loginPage("/loginForm")//리다이렉션
                .loginProcessingUrl("/login");
    }
}
