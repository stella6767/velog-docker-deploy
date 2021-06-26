package com.kang.velogbackend.domain.post;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PostRepository extends JpaRepository<Post, Long> {


    @Query(
            value = "select * from Post where id in (select postId from (select postId, count(postId) likeCount from Likes group by postId order by 2 desc) t)",
            countQuery = "select * from Post where id in (select postId from (select postId, count(postId) likeCount from Likes group by postId order by 2 desc) t)",
            nativeQuery = true
    )
    Page<Post> mTrending(Pageable pageable);

}
