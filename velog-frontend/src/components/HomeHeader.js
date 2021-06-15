import { CaretDownOutlined } from '@ant-design/icons';
import { Button, withStyles } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import { Dropdown, Menu } from 'antd';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo_img from '../logo.svg';
import { reissueAction } from '../reducers/auth';
import { adminTestAction, testAction } from '../reducers/test';
import AuthModal from './auth/ModalContainer';
import './MyHeader.scss';

const HeaderTopDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  padding-left: 10rem;
  padding-right: 10rem;
`;

const HeaderBottomDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  padding-left: 10rem;
  padding-right: 10rem;
`;

const LoginBox = styled.div`
  display: flex;
  align-items: center;
`;

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(blueGrey[900]),
    backgroundColor: blueGrey[900],
    fontSize: 16,
    marginLeft: 20,
    borderRadius: 50,
    height: 30,

    '&:hover': {
      backgroundColor: blueGrey[700],
    },
  },
}))(Button);

const HeaderLeftDiv = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const HeaderSubDiv = styled(HeaderLeftDiv)`
  width: 14rem;
`;

const HeaderDateDiv = styled.div`
  background: white;
  height: 2rem;
  width: 6rem;
  border-radius: 4px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  font-weight: 600;
  color: rgb(73, 80, 87);
  font-size: 0.875rem;
  box-shadow: rgb(0 0 0 / 5%) 0px 0px 4px;
  cursor: pointer;
`;

const StyledLoginSuccessDiv = styled.div`
  display: flex;
  margin-left: 1rem;
`;

const StyledUserImg = styled.img`
  display: block;
  height: 2rem;
  width: 2rem;
  box-shadow: rgb(0 0 0 / 9%) 0px 0px 8px;
  border-radius: 50%;
  object-fit: cover;
  transition: all 0.125s ease-in 0s;
  background-image: url('/images/search.svg');
`;

const HomeHeader = memo(() => {
  //랜더링 되는 부분

  const { loginDone, loginError, cmRespDto } = useSelector(
    (state) => state.auth,
  );
  const { testError } = useSelector((state) => state.test);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('loginDone:', loginDone);
    console.log('loginError', loginError);
    console.log('testError', testError);
    console.log('cmRespDto', cmRespDto);

    //tokenExpireWatch(testError);
  }, [loginDone, loginError, testError, cmRespDto]);

  const [loginVisible, setLoginVisible] = useState(false); //로그인 모달창이 보일지 안 보일지

  const showLoginModal = () => {
    setLoginVisible(true);
  };

  const tokenTest = () => {
    dispatch(testAction());
  };

  const adminTeset = () => {
    dispatch(adminTestAction());
  };

  // const tokenExpireWatch = (testError) => {
  //   console.log('일단은 지켜보자');

  //   if (testError != null && testError.msg === '토큰기간만료') {
  //     console.log('재발급요청이 되는지..');

  //     const refreshToken = localStorage.getItem('refreshToken');

  //     dispatch(reissueAction(refreshToken));
  //   }
  // };

  // const newAccessTokenSet = (data) => {
  //   const accessToken = data.accessToken;
  //   console.log(accessToken);
  //   //기존 accessToken 지우고
  //   localStorage.setItem('accessToken', accessToken);
  // };

  const menu = (
    <Menu>
      <Menu.Item>
        <Link
          to="/aaa"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          내 벨로그
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/write">새 글 작성</Link>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          로그아웃
        </a>
      </Menu.Item>
      <Menu.Item>
        <div onClick={tokenTest}>user Test</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={adminTeset}>admin Test</div>
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="HomeHeader">
      <HeaderTopDiv>
        <Link to="/">
          <img src={logo_img} alt="logo" />
        </Link>

        <LoginBox>
          <Link to="">
            <img src="/images/search.svg" alt="search" />
          </Link>

          {loginDone === false ? (
            <div>
              <ColorButton
                variant="contained"
                color="primary"
                onClick={showLoginModal}
              >
                로그인
              </ColorButton>
              {/* 모달 컨테이너 */}
              <AuthModal
                loginVisible={loginVisible}
                setLoginVisible={setLoginVisible}
              />
            </div>
          ) : (
            <StyledLoginSuccessDiv>
              <div>
                <StyledUserImg />
              </div>
              <div style={{ marginTop: '3px', marginLeft: '3px' }}>
                <Dropdown overlay={menu}>
                  <CaretDownOutlined
                    style={{ fontSize: '1rem', cursor: 'pointer' }}
                  />
                </Dropdown>
              </div>
            </StyledLoginSuccessDiv>
          )}
        </LoginBox>
      </HeaderTopDiv>
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
    </header>
  );
});

export default HomeHeader;
