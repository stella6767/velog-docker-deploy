package com.kang.velogbackend.service;

import com.kang.velogbackend.domain.follow.FollowRepository;
import com.kang.velogbackend.domain.user.User;
import com.kang.velogbackend.domain.user.UserRepository;
import com.kang.velogbackend.web.dto.user.UserVelogRespDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final FollowRepository followRepository;


    @Transactional
    public User 회원찾기(Long id) {
        User userEntity = userRepository.findById(id).orElseThrow(()->{
            return new IllegalArgumentException("id를 찾을 수 없습니다.");
        }); //1차 캐시
        return userEntity;
    }//더티체킹


    @Transactional(readOnly = true)
    public UserVelogRespDto 회원블로그(Long userId, Long principalId) {
        UserVelogRespDto userVelogRespDto = new UserVelogRespDto();

        User userEntity = userRepository.findById(userId).orElseThrow(()-> {
            return new IllegalArgumentException();
        });

        int followState = followRepository.mFollowState(principalId, userId);
        int followCount = followRepository.mFollowCount(userId);

        System.out.println(followState == 1);

        userVelogRespDto.setFollowState(followState == 1);
        userVelogRespDto.setFollowCount((long)followCount); // 내가 팔로우 하고 있는 카운트
        userVelogRespDto.setPostCount((long) userEntity.getPosts().size());

        userEntity.getPosts().forEach((post) ->{
            post.setLikeCount(post.getLikes().size());
        });//굳이 likeCount 집어넣을 필요없이 userEntity의 image의 likes 사이즈 들고오면 되지만, 뷰에서 연산을 최소화하기 위해 set해주는 작업을 거치자.


        userVelogRespDto.setUser(userEntity);

        return userVelogRespDto;
    }





}
