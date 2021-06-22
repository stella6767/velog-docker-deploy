import React, { memo } from 'react';
import PostBox from '../../components/PostBox';
import { StyledUserContainerDiv, StyledUserDescDiv, StyledUserProfileImg, StyledUserTopDiv, StyledUserVelogDiv, Global } from './style';

const User = memo(() => {
  return (
    <>
      <Global />
      <StyledUserContainerDiv>
        <StyledUserVelogDiv>
          <StyledUserTopDiv>
            <StyledUserProfileImg />
            <StyledUserDescDiv>
              <div className="name">강민규</div>
              <div className="description">개발자 지망생~~ 여기 적는 글들은 신뢰성 0%이므로 믿지 마세요!</div>
            </StyledUserDescDiv>
          </StyledUserTopDiv>
          <div className="line-height-div" />
          <div className="social-div"></div>
        </StyledUserVelogDiv>
        <div>넣을 지 말지 고민중</div>

        <div>
          <PostBox />
        </div>
      </StyledUserContainerDiv>
    </>
  );
});

export default User;
