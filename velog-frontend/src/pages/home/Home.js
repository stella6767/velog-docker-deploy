import { Card, Col } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import { loadUserAction } from '../../reducers/auth';
import { loadPostAction } from '../../reducers/post';
import { StyledMainDiv } from './style';

const Home = () => {
  const [isHome, setIshome] = useState(true);

  const { mainPosts, hasMorePosts, loadPostLoading, loadPostsDone } = useSelector(({ post, loading }) => ({
    mainPosts: post.mainPosts,
    hasMorePosts: post.hasMorePosts,
    loadPostLoading: loading['LOAD_POSTS_REQUEST'],
    loadPostsDone: post.loadPostsDone,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserAction());

    console.log('더미데이터 최초 한번 받아옴');

    dispatch(loadPostAction(10));
  }, []);

  useEffect(() => {
    function onScroll() {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loadPostLoading && loadPostsDone) {
          //console.log('요청함', loadPostLoading);
          dispatch(loadPostAction(10));
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts, hasMorePosts, loadPostLoading, loadPostsDone]);

  const showMainposts = () => {
    console.log(mainPosts.length);
    console.log('hasmorePost', hasMorePosts);
    console.log('loading', loadPostLoading);
  };

  return (
    <>
      <AppLayout isHome={isHome}>
        <div onClick={showMainposts}>버튼</div>
        <StyledMainDiv>
          {mainPosts.map((c) => (
            <Card hoverable cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" key={c.id} />}>
              <Meta title="Europe Street beat" description="www.instagram.com" />
            </Card>
          ))}
        </StyledMainDiv>
      </AppLayout>
    </>
  );
};

export default Home;
