import React, { memo } from 'react';
import { useState } from 'react';
import TextEditor from '../components/TextEditor';
import styled from 'styled-components';

const StyledPostDiv = styled.div`
  padding: 2rem;
`;

const writeForm = memo(() => {
  const [content, setContent] = useState('');

  return (
    <StyledPostDiv>
      <input type="text" className="form-control" placeholder="제목을 입력하세요" name="title" />

      <TextEditor name="content" content={content} onChange={(content) => setContent(content)} name="content" />

      <div>adsads</div>
    </StyledPostDiv>
  );
});

export default writeForm;
