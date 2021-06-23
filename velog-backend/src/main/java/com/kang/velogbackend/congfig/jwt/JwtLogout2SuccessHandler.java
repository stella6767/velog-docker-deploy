package com.kang.velogbackend.congfig.jwt;

import com.kang.velogbackend.service.RedisService;
import com.kang.velogbackend.utils.CookieUtill;
import com.kang.velogbackend.utils.Script;
import com.kang.velogbackend.web.dto.CMRespDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
@Component
public class JwtLogout2SuccessHandler implements LogoutSuccessHandler {

    private static final Logger log = LoggerFactory.getLogger(JwtLogout2SuccessHandler.class);
    private final RedisService redisService;
    private final CookieUtill cookieUtill;

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {


                CMRespDto<?> cmRespDto = new CMRespDto(1,"로그아웃되었습니다.",null);;
                Script.responseData(response, cmRespDto);

        }


    }






