package com.kang.velogbackend.domain.likes;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.kang.velogbackend.domain.BaseTimeEntity;
import com.kang.velogbackend.domain.post.Post;
import com.kang.velogbackend.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Entity
@Table(
        name="likes",
        uniqueConstraints={
                @UniqueConstraint(
                        name = "likes_uk",
                        columnNames={"postId","userId"}
                )
        }
)
public class Likes extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "postId")
    private Post post;

    @JsonIgnoreProperties({"posts"})
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;


}
