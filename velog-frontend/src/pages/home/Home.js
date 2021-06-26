import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';
import { loadUserAction } from '../../reducers/auth';
import { loadPostsAction, loadPostsInitAction } from '../../reducers/post';
import { StyledMainDiv } from './style';

const Home = () => {
  const [isHome] = useState(true);
  const [page, setPage] = useState(0);

  const { mainPosts, hasMorePosts, loadPostLoading, loadPostsDone } = useSelector(({ post, loading }) => ({
    mainPosts: post.mainPosts,
    hasMorePosts: post.hasMorePosts,
    loadPostLoading: loading['LOAD_POSTS_REQUEST'],
    loadPostsDone: post.loadPostsDone,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    //dispatch(loadUserAction());

    dispatch(loadPostsInitAction());
    //window.location.reload(); // 새로고침, mainPosts 데이터 초기화 작업할려는데 이렇게는 안 되겠네..
    setPage(0);
    console.log('왜 바로바로 실행이 안되지..');
    dispatch(loadPostsAction(page));
  }, []);

  useEffect(() => {
    if (loadPostsDone) {
      setPage(page + 1);
    }
  }, [loadPostsDone]);

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
              <PostCard key={post.id} post={post} loading={loadPostLoading} />
            ))}
          </StyledMainDiv>
        )}
      </AppLayout>
    </>
  );
};

export default Home;
