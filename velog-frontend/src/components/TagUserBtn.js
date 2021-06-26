import React, { memo } from 'react';
import { StyledTagLi, StyledTagLink } from './style';

const TagUserBtn = memo((props) => {
  const { tag } = props;

  return (
    <>
      <StyledTagLi>
        <span>(2)</span>
      </StyledTagLi>
    </>
  );
});

export default TagUserBtn;
