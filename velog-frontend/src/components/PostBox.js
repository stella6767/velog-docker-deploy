import React, { memo } from 'react';
import { StyledPostBoxDiv } from './style';

//트렌딩 페이지나 최신 페이지가 아닐 경우
const PostBox = memo(() => {
  return (
    <>
      <StyledPostBoxDiv>
        <h2>react 설치시 Couldn't find a package.json file</h2>
        <p>
          name : 프로젝트명(기본 폴더명)version : 프로젝트 버전(기본 1.0.0)description : 수행할 작업 내용entry point : 첫 실행 위치repository url :
          저장소 위치author : 작업자(프로젝트 팀이라면 팀명)
        </p>
        <div class="tags-wrapper"></div>
        <div class="subinfo">
          <span>2021년 5월 14일</span>
          <div class="separator">·</div>
          <span>0개의 댓글</span>
        </div>
      </StyledPostBoxDiv>
    </>
  );
});

export default PostBox;
