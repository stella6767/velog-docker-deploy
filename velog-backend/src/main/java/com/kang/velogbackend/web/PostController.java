package com.kang.velogbackend.web;

import com.kang.velogbackend.congfig.auth.PrincipalDetails;
import com.kang.velogbackend.handler.customexception.NoLoginException;
import com.kang.velogbackend.service.PostService;
import com.kang.velogbackend.web.dto.CMRespDto;
import com.kang.velogbackend.web.dto.post.PostSaveReqDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class PostController {

    private static final Logger log = LoggerFactory.getLogger(PostController.class);
    private final PostService postService;


    @PostMapping("/post")
    public CMRespDto<?> image(@RequestBody PostSaveReqDto postSaveReqDto, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        log.info("저장하기 요청 옴" + postSaveReqDto);

        if(principalDetails == null) {
            log.info("세션에 없네??");
            throw new NoLoginException("로그인이 필요한 서비스입니다.");
        }



        postService.저장하기(postSaveReqDto, principalDetails);

        //return "redirect:/user/"+principalDetails.getUser().getId();
        return null;
    }





}
