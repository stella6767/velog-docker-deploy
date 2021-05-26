import { Button, Divider, Form, Input, Modal } from "antd";
import React, { memo, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { changeField } from "../../reducers/auth";
import { ContactSupportOutlined } from "@material-ui/icons";

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

  useEffect(() => {
    //React에서는 한 함수 안에서 setState를 하고 console.log를  하면 console에는 한 박자씩 느리게 찍혀나가는 경우, hookes에는 callback 함수가 안 먹히므로
    //요렇게 확인
    console.log("수정 후 joinReqDto", joinReqDto);
  }, [joinReqDto]);

  const toggleModal = () => {
    setVisible(!visible);
    setJoinVisible(!joinVisible);
  };

  const onJoinFinish = (values) => {
    console.log("join Finish:", values);
    console.log("수정 전 joinReqDto", joinReqDto);
    setJoinReqDto(
      //그냥 덮어씌우길 원할 때는... 전개연산자 필요없이..
      {
        username: values.username,
        email: values.email,
      }
      //showMsg()
    ); //왜 콘솔에 변경사항이 바로 나타나지 않는가.. usestate가 비동기적으로 실행되서 그런가..? useEffect로 확인해봐야겠음.

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
        <div>{joinReqDto.username}</div>
      </Modal>
    </>
  );
});

export default AuthModal;
