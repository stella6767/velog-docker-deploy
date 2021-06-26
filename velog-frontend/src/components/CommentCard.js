import React, { memo } from 'react';
import { Comment, Tooltip, Avatar } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import { useState } from 'react';
import { createElement } from 'react';
import { Link } from 'react-router-dom';

const CommentCard = memo((props) => {
  const { comment, userId, postId } = props;

  //const actions = [<span key="comment-basic-reply-to">Reply to</span>];  계층형 댓글은 시간날때

  return (
    <>
      <Comment
        author={<Link to={`/${userId}`}>{comment.user.username}</Link>}
        // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />}
        content={<p dangerouslySetInnerHTML={{ __html: comment.content }} />}
        style={{ paddingBottom: '3rem' }}
        datetime={
          <Tooltip title={moment(comment.createDate).format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      />
    </>
  );
});

export default CommentCard;
