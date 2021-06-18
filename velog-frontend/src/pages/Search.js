import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import React from 'react';
import styled from 'styled-components';
import SearchLayout from '../components/SearchLayout';
import '../pages/style.css';

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
`;

const Search = () => {
  return (
    <>
      <SearchLayout />
      <StyledSearchContainerDiv>
        <StyledSearchDiv>
          <SearchOutlined style={{ position: 'absolute', fontSize: '2rem', left: '10px', zIndex: '1', top: '1rem' }} />
          <Input placeholder="검색어를 입력하세요." className="search-Input" />
        </StyledSearchDiv>
      </StyledSearchContainerDiv>
    </>
  );
};

export default Search;
