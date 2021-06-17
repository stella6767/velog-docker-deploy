package com.kang.velogbackend.congfig.jwt;

import com.kang.velogbackend.service.RedisService;
import com.kang.velogbackend.utils.Script;
import com.kang.velogbackend.web.dto.CMRespDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
public class jwtLogoutSuccessHandler implements LogoutSuccessHandler {

    private static final Logger log = LoggerFactory.getLogger(jwtLogoutSuccessHandler.class);
    private final RedisService redisService;


    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        String refreshToken = request.getHeader("refreshToken");
        log.info("refreshToken: "+ refreshToken);
        redisService.deleteData(refreshToken);

        CMRespDto<?> cmRespDto = new CMRespDto(1,"로그아웃되었습니다.",null);;

        Script.responseData(response, cmRespDto);
//        RequestDispatcher rd = request.getRequestDispatcher("/logout");
//        rd.forward(request, response);



    }
}
