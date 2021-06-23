import React, { memo } from 'react';
import AppHeader from '../../components/AppHeader';
import { StyledPostDetailContainer, Global, StyledHeadDescDiv, StyledDetailContentDiv, StyledDetailCommentDiv } from './style';
import { Link } from 'react-router-dom';
import CommentForm from '../../components/CommentForm';
import CommentCard from '../../components/CommentCard';

const PostDetail = memo(() => {
  return (
    <>
      <Global />
      <AppHeader />
      <StyledPostDetailContainer>
        <div className="head-wrapper">
          <h1>Velog 포스트로 Github를 꾸며보자!</h1>
          <StyledHeadDescDiv>
            <div class="information">
              <span class="username">
                <Link to="/@eungyeole">eungyeole</Link>
              </span>
              <span class="separator">·</span>
              <span>6일 전</span>
            </div>
            <div class="sc-bAeIUo ewzQnp">
              <button data-testid="like-btn" class="sc-eMigcr dLHGIQ">
                <svg width="10" height="10" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"></path>
                </svg>
                <span>138</span>
              </button>
            </div>
          </StyledHeadDescDiv>
        </div>

        <StyledDetailContentDiv>content</StyledDetailContentDiv>
        <StyledDetailCommentDiv>
          <h3>18개의 댓글</h3>
          <CommentForm />
          <CommentCard />
        </StyledDetailCommentDiv>
      </StyledPostDetailContainer>
    </>
  );
});

export default PostDetail;
