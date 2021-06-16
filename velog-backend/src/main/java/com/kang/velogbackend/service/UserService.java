package com.kang.velogbackend.service;

import com.kang.velogbackend.domain.user.User;
import com.kang.velogbackend.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;


    @Transactional
    public User 회원찾기(Long id) {
        User userEntity = userRepository.findById(id).orElseThrow(()->{
            return new IllegalArgumentException("id를 찾을 수 없습니다.");
        }); //1차 캐시
        return userEntity;
    }//더티체킹


}
