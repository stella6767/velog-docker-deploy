package com.kang.velogbackend.web;

import com.kang.velogbackend.service.TagService;
import com.kang.velogbackend.web.dto.CMRespDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class TagController {

    private static final Logger log = LoggerFactory.getLogger(TagController.class);
    private final TagService tagService;


    @GetMapping("/tag/search")
    public CMRespDto<?> searchByTagname(@RequestParam(value = "name") String name){

        log.info("tag 관련 게시글 찾기: " + name);

        return new CMRespDto<>(1,"태그 관련 게시글", tagService.관련게시글찾기(name));
    }

}
