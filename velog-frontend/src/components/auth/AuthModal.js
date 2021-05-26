import { Button, Divider, Form, Input, Modal } from "antd";
import React, { memo, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { changeField } from "../../reducers/auth";

const AuthModal = memo((props) => {
  //로그인 모달창과 회원가입 모달창, 함수들은 나중에 다 useMemo로 바꿔주자..
  const { visible, setVisible } = props;

  const dispatch = useDispatch();
  const { form } = useSelector(({ auth }) => ({
    form: auth.register,
  }));

  const [joinVisible, setJoinVisible] = useState(false);

  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState("Content of the modal");
  const [modalTitle, setModalTitle] = React.useState("로그인");

  const [loginForm] = Form.useForm();
  const [joinForm] = Form.useForm();
  const [, forceUpdate] = useState({}); // To disable submit button at the beginning.

  const [joinReqDto, setJoinReqDto] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    forceUpdate({});
  }, []);

  const toggleModal = () => {
    setVisible(!visible);
    setJoinVisible(!joinVisible);
  };

  const onJoinFinish = (values) => {
    console.log("Finish:", values);
    // setJoinReqDto({
    //   ...joinReqDto,
    //   values,
    // }); //왜 클릭시 바로 적용이 안 되고 두번 클릭해야 적용되는지는 생각해보자..
    //console.log(values.email);
    //console.log("joinReqDto", joinReqDto);

    dispatch(
      changeField({
        form: "register",
        value: values,
      })
    );
  };

  const onLoginFinish = (values) => {
    console.log("Finish:", values);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
    setJoinVisible(false);
  };

  return (
    <>
      {/* 로그인창 */}
      <Modal
        title="로그인"
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <div style={{ marginTop: "0.3rem" }}>
              <span style={{}}>아직 회원이 아니십니까? </span>
            </div>
            <Button
              type="link"
              style={{ color: "green" }}
              onClick={toggleModal}
            >
              회원가입
            </Button>
          </div>,
        ]}
      >
        <Form
          form={loginForm}
          name="horizontal_login"
          layout="inline"
          onFinish={onLoginFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  !loginForm.isFieldsTouched(true) ||
                  !!loginForm
                    .getFieldsError()
                    .filter(({ errors }) => errors.length).length
                }
              >
                Log in
              </Button>
            )}
          </Form.Item>
        </Form>
        <Divider plain>소셜 계정으로 로그인</Divider>

        <FcGoogle size="24" />
      </Modal>

      {/* 회원가입 창 */}
      <Modal
        title="회원가입"
        visible={joinVisible}
        onCancel={handleCancel}
        footer={[
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <div style={{ marginTop: "0.3rem" }}>
              <span style={{}}>이미 계정이 있습니까? </span>
            </div>
            <Button
              type="link"
              style={{ color: "green" }}
              onClick={toggleModal}
            >
              로그인
            </Button>
          </div>,
        ]}
      >
        <Form
          form={joinForm}
          name="horizontal_login"
          layout="inline"
          onFinish={onJoinFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  !joinForm.isFieldsTouched(true) ||
                  !!joinForm
                    .getFieldsError()
                    .filter(({ errors }) => errors.length).length
                }
              >
                회원가입
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});

export default AuthModal;
