package com.kang.velogbackend.web;

import com.kang.velogbackend.congfig.auth.PrincipalDetails;
import com.kang.velogbackend.service.UserService;
import com.kang.velogbackend.web.dto.CMRespDto;
import com.kang.velogbackend.web.dto.user.UserVelogRespDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;

    @GetMapping("/user/{userId}/{postId}")
    public CMRespDto<?> detail(@PathVariable Long userId, @PathVariable Long postId) {



        return null;
    }


    @GetMapping("/user/{id}") //개인 벨로그
    public CMRespDto<?> profile(@PathVariable Long id, @AuthenticationPrincipal PrincipalDetails principalDetails) {

        log.info("들어옴?" + id + principalDetails.getUser().getId());

        UserVelogRespDto userVelogRespDto = userService.회원블로그(id, principalDetails.getUser().getId());

        return new CMRespDto<>(1, "개인벨로그",userVelogRespDto);
        //return null;
    }





}
