package com.kang.velogbackend.domain.likes;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LikesRepository extends JpaRepository<Likes, Long> {

    //createData, modifiedDate는 아예 넣지 말자...


    @Modifying
    @Query(value = "INSERT INTO Likes(postId, userId) VALUES(:postId, :principalId)", nativeQuery = true)
    int mLike(@Param("postId") Long postId, @Param("principalId") Long principalId);

    @Modifying
    @Query(value = "DELETE FROM Likes WHERE postId = :postId AND userId = :principalId", nativeQuery = true)
    int mUnLike(@Param("postId") Long postId,@Param("principalId")  Long principalId);

}
