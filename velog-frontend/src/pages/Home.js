import { Card, Col } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import AppLayout from '../components/AppLayout';
import { loadPostAction } from '../reducers/post';

const Home = () => {
  const [isHome, setIshome] = useState(true);

  const dispatch = useDispatch();
  const { mainPosts } = useSelector((state) => state.post);

  useEffect(() => {
    console.log('더미데이터 최초 한번 받아옴');

    dispatch(loadPostAction(10));
  }, []);

  return (
    <>
      <AppLayout isHome={isHome}>
        <Col flex="1 1 20rem">
          <Card hoverable cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
        <Col flex="1 1 20rem">
          <Card hoverable cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
        <Col flex="1 1 20rem">
          <Card hoverable cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>

        {/* {mainPosts.map((c) => (
        <PostCard key={c.id} post={c} />
      ))} */}
      </AppLayout>
    </>
  );
};

export default Home;
