import { UserOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Modal } from "antd";
import React, { memo, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { initializeForm, join } from "../../reducers/auth";
import JoinModal from "./JoinModal";
import LoginModal from "./LoginModal";

const AuthModal = memo((props) => {
  //로그인 모달창과 회원가입 모달창, 함수들은 나중에 다 useMemo로 바꿔주자.. 로그인 모달과 회원가입 모달도 나중에 분리시키자..
  const { loginVisible, setLoginVisible } = props;
  const [joinVisible, setJoinVisible] = useState(false);
  const [loginForm] = Form.useForm();
  const [joinForm] = Form.useForm();
  const [, forceUpdate] = useState({}); // To disable submit button at the beginning.

  //리덕스 관련코드
  const dispatch = useDispatch();
  const { form, auth, authError } = useSelector(({ auth }) => ({
    form: auth.join,
    auth: auth.auth,
    authError: auth.authError,
  }));

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onLoginFinish = (values) => {
    console.log("Finish:", values);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setLoginVisible(false);
    setJoinVisible(false);
  };

  useEffect(() => {
    dispatch(initializeForm("join"));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log("회원가입 실패");
      console.log(authError);
      return;
    }

    if (auth) {
      console.log("회원가입 성공");
      console.log(auth);
    }
  }, [auth, authError, dispatch]);

  const toggleModal = () => {
    setLoginVisible(!loginVisible);
    setJoinVisible(!joinVisible);
  };

  const onJoinFinish = (values) => {
    console.log(values);

    const { username, password } = form;
    console.log("form", form);

    // dispatch(
    //   changeField({
    //     form: "join",
    //     value: values,
    //   })
    // );

    dispatch(join({ username, password }));
  };

  return (
    <>
      <LoginModal
        loginVisible={loginVisible}
        loginForm={loginForm}
        handleCancel={handleCancel}
        toggleModal={toggleModal}
        onLoginFinish={onLoginFinish}
      />

      <JoinModal
        joinVisible={joinVisible}
        joinForm={joinForm}
        handleCancel={handleCancel}
        toggleModal={toggleModal}
        onJoinFinish={onJoinFinish}
      />
    </>
  );
});

export default AuthModal;
