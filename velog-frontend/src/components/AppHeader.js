import { CaretDownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo_img from '../logo.svg';
import { logoutAction } from '../reducers/auth';
import { adminTestAction, test2Action, testAction } from '../reducers/test';
import AuthModal from './auth/ModalContainer';
import HomeHeader from './HomeHeader';
import './MyHeader.scss';
import { Global, HeaderTopDiv, LoginBox, StyledLoginSuccessDiv, StyledUserImg } from './style';

const AppHeader = memo((props) => {
  //랜더링 되는 부분

  const { isHome } = props;

  const { loginDone, loginError, data, testError, loading } = useSelector(({ auth, test, loading }) => ({
    loginDone: auth.loginDone,
    loginError: auth.loginError,
    testError: test.error,
    data: auth.cmRespDto,
    loading: loading['LOGOUT_REQUEST'], //그때 그때 순간순간적으로 키 값이 바뀌는데 맞춰서 loading 값을 가져오면 된다.
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log('loginDone:', loginDone);
    // console.log('loginError', loginError);
    // console.log('responsedata', data);
    // console.log('testError', testError);
    // console.log('testError', testError.message);
    // console.log('loading', loading);
  }, [loginDone, loginError, testError, data, dispatch, loading]);

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

  const generalTeset = () => {
    dispatch(test2Action());
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  const justTest = () => {
    console.log('loginDone', loginDone);
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/aaa" target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          내 벨로그
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/write">새 글 작성</Link>
      </Menu.Item>
      <Menu.Item>
        <div onClick={logout}>로그아웃</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={tokenTest}>user Test</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={adminTeset}>admin Test</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={generalTeset}>general Test</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={justTest}>just Test</div>
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="HomeHeader">
      <Global />
      <HeaderTopDiv>
        <Link to="/">
          <img src={logo_img} alt="logo" />
        </Link>

        <LoginBox>
          <Link to="">
            <img src="/images/search.svg" alt="search" />
          </Link>

          {loginDone === false ? (
            <div style={{ marginLeft: '1rem' }} className="loginButtonDiv">
              <Button onClick={showLoginModal}>로그인</Button>
              {/* 모달 컨테이너 */}
              <AuthModal loginVisible={loginVisible} setLoginVisible={setLoginVisible} />
            </div>
          ) : (
            <StyledLoginSuccessDiv>
              <div>
                <StyledUserImg />
              </div>
              <div style={{ marginTop: '3px', marginLeft: '3px' }}>
                <Dropdown overlay={menu}>
                  <CaretDownOutlined style={{ fontSize: '1rem', cursor: 'pointer' }} />
                </Dropdown>
              </div>
            </StyledLoginSuccessDiv>
          )}
        </LoginBox>
      </HeaderTopDiv>

      {isHome && <HomeHeader />}
    </header>
  );
});

export default AppHeader;
