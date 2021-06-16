import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  HeaderBottomDiv,
  HeaderDateDiv,
  HeaderLeftDiv,
  HeaderSubDiv,
} from './style';

const HomeHeader = () => {
  const dispatch = useDispatch();

  return (
    <>
      <HeaderBottomDiv>
        <HeaderLeftDiv>
          <HeaderSubDiv>
            <Link to="" className="HeaderSubA">
              <img src="/images/trending.svg" /> 트렌딩
            </Link>
            <Link to="" className="HeaderSubA">
              <img src="/images/recent.svg" /> 최신
            </Link>
          </HeaderSubDiv>
          <HeaderSubDiv>
            <HeaderDateDiv>
              이번 주
              <img src="/images/down.svg" />
            </HeaderDateDiv>
          </HeaderSubDiv>
        </HeaderLeftDiv>
        <div>
          <img src="/images/more.svg" />
        </div>
      </HeaderBottomDiv>
    </>
  );
};

export default HomeHeader;
