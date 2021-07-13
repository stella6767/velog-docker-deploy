package com.kang.velogbackend.service;

import com.kang.velogbackend.domain.comment.Comment;
import com.kang.velogbackend.domain.comment.CommentRepository;
import com.kang.velogbackend.domain.post.Post;
import com.kang.velogbackend.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class CommentService {


    private static final Logger log = LoggerFactory.getLogger(CommentService.class);

    private final CommentRepository commentRepository;


    @Transactional
    public int 삭제하기(Long id, Long userId) {
        Comment commentEntity = commentRepository.findById(id).orElseThrow(()->{
            return new IllegalArgumentException("id를 찾을 수 없습니다.");
        });

        if(commentEntity.getUser().getId() == userId) {
            commentRepository.deleteById(id);
            return 1;
        }else {
            return -1;
        }
    }



    @Transactional
    public Comment 댓글쓰기(User principal, String content, Long postId){

        Post post = Post.builder()
                .id(postId)
                .build();

        //Save 할 때 연관관계가 있으면 오브젝트로 만들어서 id값만 넣어주면 된다.
        Comment comment = Comment.builder()
                .content(content)
                .post(post)
                .user(principal)
                .build();

        return commentRepository.save(comment);

    }


}
