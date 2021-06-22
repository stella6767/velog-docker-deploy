import React, { memo } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import PostBox from '../../components/PostBox';
import { loadPostsAction } from '../../reducers/post';
import { StyledUserContainerDiv, StyledUserDescDiv, StyledUserProfileImg, StyledUserTopDiv, StyledUserVelogDiv, Global } from './style';

const User = memo(() => {
  const { mainPosts } = useSelector(({ post, loading }) => ({
    mainPosts: post.mainPosts,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('더미데이터 최초 한번 받아옴');
    dispatch(loadPostsAction(10));
  }, []);

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
          {mainPosts.map((post) => (
            <PostBox key={post.id} post={post} />
          ))}
        </div>
      </StyledUserContainerDiv>
    </>
  );
});

export default User;
