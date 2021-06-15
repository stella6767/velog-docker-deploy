package com.kang.velogbackend.congfig.auth;

import com.kang.velogbackend.domain.user.User;
import com.kang.velogbackend.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service  //메모리에 안 떠서 문제!, 꼭 붙여넣어라.
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {

    private static final Logger log = LoggerFactory.getLogger(PrincipalDetailsService.class);
    private final UserRepository userRepository;

    @Override //Authentication Maneger 가 보내줌
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        log.info("UsernamePasswordAuthenticationFilter => +" + username+"이 DB에 있는지 확인한다.");
        User principal = userRepository.findByUsername(username);

        log.info("나오는 게 정상인디.. "+principal.toString());

        if(principal == null) {
            return null;
        }else {

            //session.setAttribute("principal",principal); // jsp 아니라면 세션에 저장하고 사용해야된다.
            return new PrincipalDetails(principal);
            //@AuthenticationPrincipal 애노테이션을 사용하면 UserDetailsService에서 Return한 객체 를 파라메터로 직접 받아 사용할 수 있다.
        }
    }
}
