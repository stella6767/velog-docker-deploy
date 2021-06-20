import { Form } from 'antd';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { joinAction, loginAction } from '../../reducers/auth';
import JoinModal from './JoinModal';
import LoginModal from './LoginModal';

const AuthModal = memo((props) => {
  const { loginLoading, joinLoading } = useSelector(({ loading }) => ({
    loginLoading: loading['LOGIN_REQUEST'],
    joinLoading: loading['JOIN_REQUEST'],
  }));

  //로그인 모달창과 회원가입 모달창, 함수들은 나중에 다 useMemo로 바꿔주자.. 로그인 모달과 회원가입 모달도 나중에 분리시키자..
  const { loginVisible, setLoginVisible, joinDone, joinError } = props;
  const [joinVisible, setJoinVisible] = useState(false);
  const [loginForm] = Form.useForm();
  const [joinForm] = Form.useForm();
  const [, forceUpdate] = useState({}); // To disable submit button at the beginning.

  //리덕스 관련코드
  const dispatch = useDispatch();

  useEffect(() => {
    //console.log('joinForm', joinForm);
    forceUpdate({});
  }, []);

  useEffect(() => {
    console.log('loginLoading: ', loginLoading, 'joinLoaing', joinLoading);
    //console.log('loginDone', loginDone, 'trigger 안 되는디..');
    //console.log('joinDone', joinDone, 'trigger 안 되는디..');
    //왜 여기서 바로 반영이 안 되는 거지...진짜 짜증나네...이유를 모르겠으니까 답답해 뒤지겄네..
  }, [loginLoading, joinLoading]);

  useEffect(() => {
    if (joinError) {
      alert('회원가입 실패');
      console.log(joinError);
      return;
    }

    if (joinDone) {
      alert('회원가입 성공');
      console.log(joinDone);
      setJoinVisible(false);
    }
  }, [joinDone, joinError]);

  const handleCancel = () => {
    console.log('Clicked cancel button');
    joinForm.resetFields();
    loginForm.resetFields();
    setLoginVisible(false);
    setJoinVisible(false);
  };

  const toggleModal = () => {
    setLoginVisible(!loginVisible);
    setJoinVisible(!joinVisible);
  };

  const onJoinFinish = (values) => {
    console.log(values);

    const whiteSpace = checkSpace(values.username, values.password);

    if (whiteSpace) {
      return alert('공백 금지');
    } else {
      dispatch(joinAction(values));
      joinForm.resetFields();
    }
  };

  const onLoginFinish = (values) => {
    console.log('login Finish:', values);

    const whiteSpace = checkSpace(values.username, values.password);

    if (whiteSpace) {
      return alert('공백 금지');
    } else {
      dispatch(loginAction(values));
      loginForm.resetFields();
    }
  };

  const checkSpace = (username, password) => {
    //공백체크
    //{postData.split(/(#[^\s#]+)/g).map((v) => {

    if (/(\s)/.test(username) || /(\s)/.test(password)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <LoginModal
        loginVisible={loginVisible}
        loginForm={loginForm}
        handleCancel={handleCancel}
        toggleModal={toggleModal}
        onLoginFinish={onLoginFinish}
        loading={loginLoading}
      />

      <JoinModal
        joinVisible={joinVisible}
        joinForm={joinForm}
        handleCancel={handleCancel}
        toggleModal={toggleModal}
        onJoinFinish={onJoinFinish}
        loading={joinLoading}
      />
    </>
  );
});

export default AuthModal;
