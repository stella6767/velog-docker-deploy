import React, { memo, useState } from 'react';
import useUpdateEffect from '../lib/hooks/useUpdateEffect';
import { StyledDetailCommentDiv } from '../pages/user/style';
import CommentCard from './CommentCard';
import CommentForm from './CommentForm';

//댓글박스
const PostDetailComment = memo((props) => {
  const { post, userId, postId, getPostDone } = props;

  const [commentLength, setCommentLength] = useState(post.comments.length);
  const [comments, setComments] = useState(post.comments);

  useUpdateEffect(() => {
    if (getPostDone) {
      setComments(post.comments);
      setCommentLength(post.comments.length);
    }
  }, [getPostDone]);

  return (
    <>
      <StyledDetailCommentDiv>
        <h3>{commentLength}개의 댓글</h3>
        <CommentForm
          postId={post.id}
          setCommentLength={setCommentLength}
          commentLength={commentLength}
          setComments={setComments}
          comments={comments}
        />
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} userId={userId} postId={postId} />
        ))}
      </StyledDetailCommentDiv>
    </>
  );
});

export default PostDetailComment;
