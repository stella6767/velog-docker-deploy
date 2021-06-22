package com.kang.velogbackend.domain.follow;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.kang.velogbackend.domain.BaseTimeEntity;
import com.kang.velogbackend.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Entity
@Table(   //제약조건 걸기 = 팔로우 한 사람 또 팔로우 할 수 없게
        name="follow",
        uniqueConstraints={
                @UniqueConstraint(
                        name = "follow_uk",
                        columnNames={"fromUserId","toUserId"}
                )
        }
)
public class Follow extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnoreProperties({"images"})
    @JoinColumn(name = "fromUserId")
    @ManyToOne
    private User fromUser; // ~~ 로부터  ,팔로우하는 사람

    @JsonIgnoreProperties({"images"})
    @JoinColumn(name = "toUserId")
    @ManyToOne
    private User toUser; // ~~ 를, 팔로우 당하는 사람

}