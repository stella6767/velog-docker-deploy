import React, { memo } from 'react';
import { useEffect } from 'react';
import SearchLayout from '../../components/SearchLayout';
import { StyledSearchContainerDiv, StyledSearchDiv } from './style';

const TagSearch = memo(() => {
  useEffect(() => {
    console.log('왜 안 들어가지지?????');
  }, []);

  return (
    <>
      {/* <SearchLayout />
      <StyledSearchContainerDiv>
        <StyledSearchDiv>asdadads</StyledSearchDiv>
    
      </StyledSearchContainerDiv>
 */}
      <div>asdadsads</div>
    </>
  );
});

export default TagSearch;
