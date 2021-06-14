package com.kang.velogbackend.domain.user;

import com.kang.velogbackend.domain.BaseTimeEntity;
import com.kang.velogbackend.domain.post.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;
import java.util.Arrays;
import java.util.List;


@Builder
@AllArgsConstructor
@Getter
@Entity
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false, length = 100) //12345 -> 해쉬(비밀번호 암호화)
    private String password;

    @Column
    private String email; //소셜가입이 아닌 사람은 이메일이 없도록..

    @Column
    private String picture;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    //@JsonIgnore
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY) //일단 임시방편 eager로
    private List<Post> posts;


    public void commonJoin(String password, Role role){ //소셜 로그인 아닐시
        this.password = password;
        this.role = role;
    }

    public User() { //기본생성자로 posts 초기화 값을 미리 준다면?
        this.posts = Arrays.asList();

        System.out.println("why??? " + posts);
    }
}
