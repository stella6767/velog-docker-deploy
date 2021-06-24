import React, { memo } from 'react';
import { post } from '../lib/api/post';
import { StyledPostBoxDiv, StyledPostContentP, StyledTagLink } from './style';
import moment from 'moment';
import { Link } from 'react-router-dom';

//트렌딩 페이지나 최신 페이지가 아닐 경우
const PostBox = memo((props) => {
  const { post } = props;

  return (
    <>
      <Link to="/">
        <StyledPostBoxDiv>
          {/* <div></div>여기는 유저 info
        <div></div>여기는 image */}
          <h2>{post.title}</h2>
          <StyledPostContentP dangerouslySetInnerHTML={{ __html: post.content.substr(0, 200) }} />
          <div className="tags-wrapper">
            <StyledTagLink to="/sdaas">태그 map으로 뿌려야지..</StyledTagLink>
          </div>
          <div className="subinfo">
            <span>{moment(post.createDate).format('YYYY년 MM월 DD일')}</span>
            <div className="separator">·</div>
            <span>{post.comments.length}개의 댓글</span>
          </div>
        </StyledPostBoxDiv>
      </Link>
    </>
  );
});

export default PostBox;
