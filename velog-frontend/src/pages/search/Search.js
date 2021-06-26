import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PostBox from '../../components/PostBox';
import SearchLayout from '../../components/SearchLayout';
import './style.css';

const StyledSearchDiv = styled.div`
  display: flex;
  height: 4rem;
  position: relative;
  border: solid 1px black;
`;

const StyledSearchContainerDiv = styled.div`
  /* padding: 2rem; */
  padding-left: 3rem;
  padding-right: 3rem;
  padding-top: 2rem;
  width: 768px;
  margin-left: auto;
  margin-right: auto;
`;

const Search = () => {
  const { mainPosts } = useSelector(({ post, loading }) => ({
    mainPosts: post.mainPosts,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('더미데이터 최초 한번 받아옴');
    //dispatch(loadPostsAction(10));
  }, []);

  return (
    <>
      <SearchLayout />
      <StyledSearchContainerDiv>
        <StyledSearchDiv>
          <SearchOutlined style={{ position: 'absolute', fontSize: '2rem', left: '10px', zIndex: '1', top: '1rem' }} />
          <Input placeholder="검색어를 입력하세요." className="search-Input" />
        </StyledSearchDiv>
        <PostBox />
      </StyledSearchContainerDiv>
    </>
  );
};

export default Search;
