package com.kang.velogbackend.domain.user;

import com.kang.velogbackend.domain.BaseTimeEntity;
import com.kang.velogbackend.domain.post.Post;
import lombok.*;

import javax.persistence.*;
import java.util.List;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
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
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY) //DTO 만들어서 LazyLoading issue 해결
    private List<Post> posts;


    public void commonJoin(String password, Role role){ //소셜 로그인 아닐시
        this.password = password;
        this.role = role;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", picture='" + picture + '\'' +
                ", role=" + role +
                '}';
    }
}
