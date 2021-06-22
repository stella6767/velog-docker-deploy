package com.kang.velogbackend.web;

import com.kang.velogbackend.congfig.auth.PrincipalDetails;
import com.kang.velogbackend.handler.customexception.NoLoginException;
import com.kang.velogbackend.service.PostService;
import com.kang.velogbackend.web.dto.CMRespDto;
import com.kang.velogbackend.web.dto.post.PostSaveReqDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
public class PostController {

    private static final Logger log = LoggerFactory.getLogger(PostController.class);
    private final PostService postService;


    @GetMapping("/")
    public CMRespDto<?> findAll(@AuthenticationPrincipal PrincipalDetails details, @PageableDefault(sort = "id",direction = Sort.Direction.DESC, size = 10) Pageable pageable){

        log.info("메인 페이지.");


        return null;
    }




    @PostMapping("/post")
    public CMRespDto<?> image(@RequestBody PostSaveReqDto postSaveReqDto, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        log.info("저장하기 요청 옴" + postSaveReqDto.getTitle());

        if(principalDetails == null) {
            log.info("세션에 없네??");
            throw new NoLoginException("로그인이 필요한 서비스입니다.");
        }


        try {
            postService.저장하기(postSaveReqDto, principalDetails);
        } catch (IOException e) {
            e.printStackTrace();
        }

        //return "redirect:/user/"+principalDetails.getUser().getId();
        return null;
    }



//    @PostMapping("/post/{id}/thumbnail")
//    public CMRespDto<?> postThumbnail(@PathVariable int id, MultipartFile postThumbnail, @AuthenticationPrincipal PrincipalDetails principalDetails){
//        log.info("들어옴 " + id);
//        log.info("파일 받기 : "+postThumbnail.getOriginalFilename());
//        return null;
//    }






}
