import { Button, Divider, Form, Input, Modal } from 'antd';
import React, { memo } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { UserOutlined } from '@ant-design/icons';
import loading from '../../reducers/loading';

const LoginModal = memo((props) => {
  const { loginVisible, loginForm, handleCancel, toggleModal, onLoginFinish, loading } = props;

  return (
    <>
      {' '}
      <Modal
        title="로그인"
        visible={loginVisible}
        onCancel={handleCancel}
        footer={[
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <div style={{ marginTop: '0.3rem' }}>
              <span style={{}}>아직 회원이 아니십니까? </span>
            </div>
            <Button type="link" style={{ color: 'green' }} onClick={toggleModal}>
              회원가입
            </Button>
          </div>,
        ]}
      >
        <Form form={loginForm} name="horizontal_login" layout="inline" onFinish={onLoginFinish}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={!loginForm.isFieldsTouched(true) || !!loginForm.getFieldsError().filter(({ errors }) => errors.length).length}
              >
                Log in
              </Button>
            )}
          </Form.Item>
        </Form>
        <Divider plain>소셜 계정으로 로그인</Divider>

        <FcGoogle size="24" />
      </Modal>
    </>
  );
});

export default LoginModal;
