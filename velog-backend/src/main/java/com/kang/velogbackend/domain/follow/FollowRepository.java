package com.kang.velogbackend.domain.follow;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface FollowRepository extends JpaRepository<Follow,Long> {

    @Modifying
    @Query(value = "INSERT INTO Follow(fromUserId, toUserId, createDate) VALUES(:fromUserId, :toUserId, now())", nativeQuery = true)
    Long mfollow(Long fromUserId, Long toUserId); //요렇게 하면 Follow 객체 리턴이 안 되나....
    //prepareStatement updateQuery() => -1,1,0
    @Modifying
    @Query(value = "DELETE FROM Follow WHERE fromUserId = :fromUserId AND toUserId = :toUserId", nativeQuery = true)
    Long mUnfollow(Long fromUserId, Long toUserId); //prepareStatement updateQuery() => -1,1,0

    @Query(value = "select count(*) from Follow where fromUserId = :principalId AND toUserId = :userId", nativeQuery = true)
    Long mFollowState(Long principalId, Long userId); //내가 팔로우하고 있는지의 여부

    @Query(value = "select count(*) from Follow where fromUserId = :userId", nativeQuery = true)
    long mFollowCount(Long userId); //페이지의 주인을 팔로우하고 있는 사람숫자
}
