import { Comment, Tooltip } from 'antd';
import moment from 'moment';
import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';

const CommentCard = memo((props) => {
  const { comment, userId } = props;

  const onDeleteClick = () => {
    console.log('댓글 삭제');
  };

  return (
    <>
      <Comment
        actions={[
          <span key="comment-nested-reply-to" onClick={onDeleteClick}>
            삭제
          </span>,
        ]}
        author={<Link to={`/${userId}`}>{comment.user.username}</Link>}
        content={<p dangerouslySetInnerHTML={{ __html: comment.content }} />}
        style={{ paddingBottom: '3rem' }}
        datetime={
          <Tooltip title={moment(comment.createDate).format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      ></Comment>
    </>
  );
});

export default CommentCard;
