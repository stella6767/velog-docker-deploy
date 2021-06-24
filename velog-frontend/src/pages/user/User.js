import React, { memo } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import PostBox from '../../components/PostBox';
import { loadPostsAction } from '../../reducers/post';
import { userAction } from '../../reducers/user';
import { StyledUserContainerDiv, StyledUserDescDiv, StyledUserProfileImg, StyledUserTopDiv, StyledUserVelogDiv, Global } from './style';

const User = memo((props) => {
  const { posts, userData, userLoading } = useSelector(({ user, loading }) => ({
    userData: user.userData,
    userLoading: loading['USER_REQUEST'],
    posts: user.posts,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('userData: ', userData);
  }, [userData]);

  useEffect(() => {
    //console.log('유저데이터 한번 받아옴 10개 기준, 일단은 다 받아오자..');
    console.log('url parame', props.match.params.userId);
    dispatch(userAction(props.match.params.userId));
  }, []);

  // const postCount = userData.postCount;

  return (
    <>
      <AppLayout />
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
          {posts.map((post) => (
            <PostBox key={post.id} post={post} />
          ))}
        </div>
      </StyledUserContainerDiv>
    </>
  );
});

export default User;