package com.kang.velogbackend.service;

import com.kang.velogbackend.congfig.auth.PrincipalDetails;
import com.kang.velogbackend.domain.post.Post;
import com.kang.velogbackend.domain.post.PostRepository;
import com.kang.velogbackend.domain.tag.Tag;
import com.kang.velogbackend.domain.tag.TagRepository;
import com.kang.velogbackend.domain.user.User;
import com.kang.velogbackend.domain.user.UserRepository;
import com.kang.velogbackend.web.dto.user.UserVelogRespDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final TagRepository tagRepository;


    @Value("${file.path}")  //@Value 안의 ${} 안으로 application.yml 의 value값 바로 땡겨올 수 있음.
    private String uploadFolder;



    @Transactional
    public User 회원사진변경(MultipartFile profileImageFile, PrincipalDetails principalDetails, HttpServletRequest request) {

        UUID uuid = UUID.randomUUID(); //같은 이름의 사진이 들어오면 충돌나므로 방지하기 위해
        String imageFileName = uuid+"_"+profileImageFile.getOriginalFilename();
        System.out.println("파일명 : "+imageFileName);

        Path imageFilePath = Paths.get(uploadFolder+imageFileName);
        System.out.println("파일패스 : "+imageFilePath);

        String imageUrl = "http://localhost:" +  request.getLocalPort() + "/upload/" + imageFileName;
        log.info(request.getLocalAddr() + " " + request.getRequestURI());
        log.info("imageUrl: " + imageUrl);

        try {
            Files.write(imageFilePath, profileImageFile.getBytes());
            System.out.println();
        } catch (Exception e) {
            e.printStackTrace();
        }

        User userEntity = userRepository.findById(principalDetails.getUser().getId()).get();
        userEntity.setPicture(imageFileName); //풀경로는 안넣어도 되는게,
        userEntity.setProfileImgUrl(imageUrl);

        return userEntity;
    }//더티체킹




    @Transactional
    public int 회원탈퇴(Long id) {
        User userEntity = userRepository.findById(id).orElseThrow(()->{
            return new IllegalArgumentException("id를 찾을 수 없습니다.");
        });

            userRepository.deleteById(id);
            return 1;

    }


    @Transactional(readOnly = true)
    public UserVelogRespDto 회원블로그(Long userId) {
        UserVelogRespDto userVelogRespDto = new UserVelogRespDto();

        User userEntity = userRepository.findById(userId).orElseThrow(()-> {
            return new IllegalArgumentException();
        });

        userVelogRespDto.setPostCount((long) userEntity.getPosts().size());

        userEntity.getPosts().forEach((post) ->{
            post.setLikeCount(post.getLikes().size());
        });//굳이 likeCount 집어넣을 필요없이 userEntity의 image의 likes 사이즈 들고오면 되지만, 뷰에서 연산을 최소화하기 위해 set해주는 작업을 거치자.

        List<Tag> tagsEntity = tagRepository.mFindUserTags(userId);

        userVelogRespDto.setTags(tagsEntity);
        userVelogRespDto.setUser(userEntity);

        return userVelogRespDto;
    }



    @Transactional(readOnly = true)
    public Page<Post> 좋아요게시글목록(Long principalId, Pageable pageable){

        log.info("전체찾기");
        Page<Post> likePosts = postRepository.mLikeList(pageable, principalId);

            //좋아요 하트 색깔 로직
        likePosts.forEach((post)->{
                int likeCount = post.getLikes().size();
                post.setLikeCount(likeCount);
                        post.setLikeState(true);

            });


        return likePosts;
    }




}
