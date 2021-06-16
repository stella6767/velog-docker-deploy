import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { test2Action } from '../reducers/test';
import {
  HeaderBottomDiv,
  HeaderDateDiv,
  HeaderLeftDiv,
  HeaderSubDiv,
} from './style';

const HomeHeader = () => {
  const dispatch = useDispatch();

  const test = () => {
    dispatch(test2Action());
  };

  return (
    <>
      <HeaderBottomDiv>
        <HeaderLeftDiv>
          <HeaderSubDiv>
            <Link to="" className="HeaderSubA">
              <img src="/images/trending.svg" onClick={test} />
              트렌딩
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
