import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';
import { loadUserAction } from '../../reducers/auth';
import { loadPostsAction } from '../../reducers/post';
import { StyledMainDiv } from './style';

const Home = () => {
  const [isHome] = useState(true);

  const { mainPosts, hasMorePosts, loadPostLoading, loadPostsDone, page } = useSelector(({ post, loading }) => ({
    mainPosts: post.mainPosts,
    hasMorePosts: post.hasMorePosts,
    loadPostLoading: loading['LOAD_POSTS_REQUEST'],
    loadPostsDone: post.loadPostsDone,
    page: post.page,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    //dispatch(loadUserAction());
    console.log('더미데이터 최초 한번 받아옴');
    dispatch(loadPostsAction(page));
  }, []);

  useEffect(() => {
    console.log(mainPosts);

    function onScroll() {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loadPostLoading && loadPostsDone) {
          //console.log('요청함', loadPostLoading);
          //console.log('이게 될까?', page);
          dispatch(loadPostsAction(page));
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts, hasMorePosts, loadPostLoading, loadPostsDone, dispatch, page]);

  return (
    <>
      <AppLayout isHome={isHome}>
        {mainPosts.length != 1 && (
          <StyledMainDiv>
            {mainPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </StyledMainDiv>
        )}
      </AppLayout>
    </>
  );
};

export default Home;
