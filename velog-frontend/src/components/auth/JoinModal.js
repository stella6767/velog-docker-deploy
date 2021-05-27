import { Button, Divider, Form, Input, Modal } from "antd";
import React, { memo } from "react";
import { UserOutlined } from "@ant-design/icons";

const JoinModal = memo((props) => {
  const { joinVisible, joinForm, handleCancel, toggleModal, onJoinFinish } =
    props;

  return (
    <div>
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
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input placeholder="Password" />
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
    </div>
  );
});

export default JoinModal;
