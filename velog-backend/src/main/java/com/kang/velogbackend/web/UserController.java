package com.kang.velogbackend.web;

import com.kang.velogbackend.web.dto.CMRespDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);


    @GetMapping("/user/{postId}")
    public CMRespDto<?> detail(@PathVariable int postId) {


        return null;
    }





}
