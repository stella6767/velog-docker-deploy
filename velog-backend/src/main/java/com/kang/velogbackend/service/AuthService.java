package com.kang.velogbackend.service;

import com.kang.velogbackend.domain.user.Role;
import com.kang.velogbackend.domain.user.User;
import com.kang.velogbackend.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional
    public void 회원가입(User user) { //@RestController가 아니니까 return 할 필요없음. 리액트나 안드로이드에게 던질 때는 리턴 필요

        String rawPassword = user.getPassword();
        String encPassword = bCryptPasswordEncoder.encode(rawPassword);

        user.commonJoin(encPassword, Role.USER);

        log.info("user: '{}'",user);
        userRepository.save(user);
    }



}

