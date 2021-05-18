package com.kang.velogbackend.domain.user;

import com.kang.velogbackend.domain.BaseTimeEntity;
import com.kang.velogbackend.domain.post.Post;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column
    private String picture;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;


    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Post> posts;

    @Builder
    public User(String name, String email, String picture, List<Post> posts, Role role) {
        this.name = name;
        this.email = email;
        this.picture = picture;
        this.posts = posts;
        this.role = role;
    }

}
