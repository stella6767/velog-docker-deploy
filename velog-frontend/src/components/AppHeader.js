import { CaretDownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import React, { memo, useEffect, useState } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo_img from '../logo.svg';
import { logoutAction } from '../reducers/auth';
import { adminTestAction, testAction } from '../reducers/test';
import AuthModal from './auth/ModalContainer';
import HomeHeader from './HomeHeader';
import './MyHeader.scss';
import { Global, HeaderTopDiv, LoginBox, StyledAppHeader, StyledLoginSuccessDiv, StyledUserImg } from './style';
import useUpdateEffect from '../lib/hooks/useUpdateEffect';

const AppHeader = memo((props) => {
  //랜더링 되는 부분

  const { isHome } = props;

  const { loginDone, loginError, joinDone, joinError, data } = useSelector(({ auth, test, loading }) => ({
    loginDone: auth.loginDone,
    loginError: auth.loginError,
    data: auth.cmRespDto,
    joinDone: auth.joinDone,
    joinError: auth.joinError,
    //loading: loading['LOGOUT_REQUEST'], //그때 그때 순간순간적으로 키 값이 바뀌는데 맞춰서 loading 값을 가져오면 된다.
  }));

  const dispatch = useDispatch();

  useUpdateEffect(() => {
    console.log(loginDone, 'loginError', loginError);

    if (loginDone) {
      alert('로그인 성공'); //매번 랜더링 될 때마다 실행되네.. home애서 실행하도록 해야겠다...
      setLoginVisible(false);
      //console.log('쿠키는?', document.cookie);
    }

    if (loginError) {
      alert('로그인 실패');
      return;
    }
  }, [loginDone, loginError]);

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

  // const generalTeset = () => {
  //   dispatch(test2Action());
  // };

  const logout = () => {
    dispatch(logoutAction());
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
        <Link to="/setting">설정</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <StyledAppHeader>
      <Global />
      <HeaderTopDiv>
        <Link to="/">
          <img src={logo_img} alt="logo" />
        </Link>

        <LoginBox>
          <Link to="/search">
            <img src="/images/search.svg" alt="search" />
          </Link>

          {loginDone === false ? (
            <div style={{ marginLeft: '1rem' }} className="loginButtonDiv">
              <Button onClick={showLoginModal}>로그인</Button>
              {/* 모달 컨테이너 */}
              <AuthModal data={data} loginVisible={loginVisible} setLoginVisible={setLoginVisible} joinDone={joinDone} joinError={joinError} />
            </div>
          ) : (
            <StyledLoginSuccessDiv>
              <Dropdown overlay={menu} trigger={['click']} overlayStyle={{ fontSize: '1rem' }}>
                <div className="ant-dropdown-link" onClick={(e) => e.preventDefault()} style={{ display: 'flex', marginTop: '0.3rem' }}>
                  <div>
                    <StyledUserImg />
                  </div>
                  <div style={{ marginTop: '3px', marginLeft: '3px' }}>
                    <CaretDownOutlined style={{ fontSize: '1rem', cursor: 'pointer' }} />
                  </div>
                </div>
              </Dropdown>
            </StyledLoginSuccessDiv>
          )}
        </LoginBox>
      </HeaderTopDiv>

      {isHome && <HomeHeader />}
    </StyledAppHeader>
  );
});

export default AppHeader;
