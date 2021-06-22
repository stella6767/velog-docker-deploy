package com.kang.velogbackend.web;

import com.kang.velogbackend.congfig.auth.PrincipalDetails;
import com.kang.velogbackend.web.dto.CMRespDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);


    @GetMapping("/user/{id}/{postId}")
    public CMRespDto<?> detail(@PathVariable int postId) {


        return null;
    }


    @GetMapping("/user/{id}") //개인 벨로그
    public CMRespDto<?> profile(@PathVariable int id, @AuthenticationPrincipal PrincipalDetails principalDetails) {

        //UserProfileRespDto userProfileRespDto = userService.회원프로필(id, principalDetails.getUser().getId());

        return null;
    }



}
