package com.kang.velogbackend.web;

import com.kang.velogbackend.congfig.auth.PrincipalDetails;
import com.kang.velogbackend.domain.post.Post;
import com.kang.velogbackend.domain.user.User;
import com.kang.velogbackend.handler.customexception.NoLoginException;
import com.kang.velogbackend.service.UserService;
import com.kang.velogbackend.web.dto.CMRespDto;
import com.kang.velogbackend.web.dto.user.UserVelogRespDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

@RequiredArgsConstructor
@RestController
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;



    @GetMapping("/user/{userId}") //개인 벨로그
    public CMRespDto<?> profile(@PathVariable Long userId) {

        log.info("들어옴?" + userId );

        UserVelogRespDto userVelogRespDto = userService.회원블로그(userId);

        return new CMRespDto<>(1, "개인벨로그",userVelogRespDto);
        //return null;
    }



    @GetMapping("/user/likelist")  //내가 좋아요 한 글들.
    public CMRespDto<?> findAllByLike(@AuthenticationPrincipal PrincipalDetails details, @PageableDefault(size = 10) Pageable pageable){

        log.info("유저 개인이 좋아요 한 글 리스트");

        if(details == null){
            throw new NoLoginException("로그인이 필요한 서비스입니다");
        }

        Page<Post> likePosts = userService.좋아요게시글목록(details.getUser().getId(), pageable );
        return new CMRespDto<>(1, "좋아요 한 게시글목록", likePosts);
    }



    @DeleteMapping("/user")
    public CMRespDto<?> deleteById(@AuthenticationPrincipal PrincipalDetails details){

        log.info("회원 탈퇴 ");

        if(details == null){
            throw new NoLoginException("로그인이 필요한 서비스입니다");
        }

        int result = userService.회원탈퇴(details.getUser().getId());

        return new CMRespDto<>(result, "회원탈퇴하였습니다.", null);
    }


    @PutMapping("/user/{id}/profileImageUrl")
    public CMRespDto<?> profileImageUrlUpdate(@PathVariable Long id, MultipartFile profileImageFile, @AuthenticationPrincipal PrincipalDetails principalDetails, HttpServletRequest request){

        log.info("들어오긴 했나.." + id);
        log.info("파일 받기 : "+profileImageFile.getOriginalFilename());
        User userEntity = userService.회원사진변경(profileImageFile, principalDetails, request);
        principalDetails.setUser(userEntity); //세션 값에 저장된 imagProfile도 변경함으로서 세션 이미지를 들고있는 jsp 경로 모두 변경

        return new CMRespDto<>(1, "프로필 사진을 변경하였습니다.",  userEntity.getProfileImgUrl());
    }




}
