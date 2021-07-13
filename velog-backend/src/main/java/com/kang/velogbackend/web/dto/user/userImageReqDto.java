package com.kang.velogbackend.web.dto.user;

import com.kang.velogbackend.domain.user.User;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;

@Data
public class userImageReqDto {

    private MultipartFile file;
    private String caption;
    private String tags;

//    public User toEntity(String postImageUrl, User userEntity) {
//        return Image.builder()
//                .caption(caption)
//                .postImageUrl(postImageUrl)
//                .user(userEntity)
//                .build();
//    }
}
