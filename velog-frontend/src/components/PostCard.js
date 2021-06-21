import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { Global, StyledPostCardDateDiv, StyledPostCardFootDiv } from './style';
import { Link } from 'react-router-dom';

const PostCard = (props) => {
  const { post, key } = props;

  return (
    <>
      <Global />
      <Card cover={<img alt="example" src={post.thumbnail} />}>
        <Card.Meta title={post.title} description={post.content} />

        <StyledPostCardDateDiv>
          <span>5일 전</span>
          <span className="separator">·</span>
          <span>18개의 댓글</span>
        </StyledPostCardDateDiv>
        <StyledPostCardFootDiv>
          <Link to="" className="userinfo" href="/@eungyeole">
            이미지
            <span>
              by <b>eungyeole</b>
            </span>
          </Link>
          <div className="likes">
            <svg width="5" height="5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"></path>
            </svg>
            128
          </div>
        </StyledPostCardFootDiv>
      </Card>
    </>
  );
};

PostCard.propTypes = {};

export default PostCard;
