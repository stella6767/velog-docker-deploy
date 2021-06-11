package com.kang.velogbackend.web;

import com.kang.velogbackend.web.dto.CMRespDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.stream.Collectors;

@RestController
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    @GetMapping("user/test")
    public CMRespDto<?> test(@RequestHeader MultiValueMap<String, String> headers) {
        headers.forEach((key, value) -> {
            log.info(String.format(
                    "Header '%s' = %s", key, value.stream().collect(Collectors.joining("|"))));
        });

        log.info("token이 만료되었다면 여기를 못 탈 것이여..");

        return new CMRespDto<>(1, "토큰이 만료되지 않았네",null );
    }

    @GetMapping("/test")
    public void test2(@RequestHeader MultiValueMap<String, String> headers) {
        headers.forEach((key, value) -> {
            log.info(String.format(
                    "Header '%s' = %s", key, value.stream().collect(Collectors.joining("|"))));
        });

        log.info("why shit");
    }



}
