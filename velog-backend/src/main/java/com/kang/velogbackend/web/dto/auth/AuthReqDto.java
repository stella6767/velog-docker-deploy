package com.kang.velogbackend.web.dto.auth;

import lombok.Data;

@Data
public class AuthReqDto { //일반 유저 로그인과 회원가입 둘 다
    private String username;
    private String password;
}