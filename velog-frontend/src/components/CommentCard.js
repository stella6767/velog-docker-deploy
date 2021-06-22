import React, { memo } from 'react';
import { Comment, Tooltip, Avatar } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import { useState } from 'react';
import { createElement } from 'react';

const CommentCard = memo(() => {
  const actions = [<span key="comment-basic-reply-to">Reply to</span>];

  return (
    <>
      <Comment
        actions={actions}
        author={<a>Han Solo</a>}
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />}
        content={
          <p>
            We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create
            their product prototypes beautifully and efficiently.
          </p>
        }
        datetime={
          <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      />
    </>
  );
});

export default CommentCard;
