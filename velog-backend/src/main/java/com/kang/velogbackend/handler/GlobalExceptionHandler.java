package com.kang.velogbackend.handler;

import com.kang.velogbackend.web.dto.CMRespDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController //데이터를 리턴하기 위해서
@ControllerAdvice //모든 익셉션을 낚아챔.
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(value = Exception.class)
    public CMRespDto<?> Exception(Exception e){

        log.warn(e.getMessage());

        return new CMRespDto<>(-1, "에러터짐ㅠㅠ",null);
    }


}
