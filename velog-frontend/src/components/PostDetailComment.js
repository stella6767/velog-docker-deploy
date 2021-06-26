import React, { memo } from 'react';
import { useState } from 'react';
import { StyledDetailCommentDiv } from '../pages/user/style';
import CommentCard from './CommentCard';
import CommentForm from './CommentForm';

//댓글박스
const PostDetailComment = memo((props) => {
  const { post, userId, postId } = props;

  const [commentLength, setCommentLength] = useState(post.comments.length);

  return (
    <>
      <StyledDetailCommentDiv>
        <h3>{commentLength}개의 댓글</h3>
        <CommentForm postId={post.id} setCommentLength={setCommentLength} commentLength={commentLength} />
        {post.comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} userId={userId} postId={postId} />
        ))}
        {/* <CommentCard /> */}
      </StyledDetailCommentDiv>
    </>
  );
});

export default PostDetailComment;
