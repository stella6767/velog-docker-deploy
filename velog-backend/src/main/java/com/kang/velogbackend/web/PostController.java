package com.kang.velogbackend.web;

import com.kang.velogbackend.domain.post.Post;
import com.kang.velogbackend.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RequiredArgsConstructor
@RestController
public class PostController {

    private final PostService postService;


    @PostMapping("/book")
    public ResponseEntity<?> save(@RequestBody Post post){
        return new ResponseEntity<>(postService.저장하기(post), HttpStatus.CREATED);//200
    }

    @CrossOrigin
    @GetMapping("/book")
    public ResponseEntity<?> findAll(){
        return new ResponseEntity<>(postService.모두가져오기(),HttpStatus.OK);//200
    }

    @CrossOrigin
    @GetMapping("/book/{id}")
    public ResponseEntity<?>findById(@PathVariable Long id){
        return new ResponseEntity<>(postService.한건가져오기(id),HttpStatus.OK);//200
    }
}
