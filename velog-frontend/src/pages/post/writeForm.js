import React, { memo } from 'react';
import { useState } from 'react';
import TextEditor from '../../components/TextEditor';
import styled from 'styled-components';
import { Global } from './style';
import { Input, Form, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { addPostAction } from '../../reducers/post';

const StyledPostDiv = styled.div`
  padding: 2rem;
`;

const writeForm = memo(() => {
  const [value, setvalue] = useState('');
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const onPostFinish = (values) => {
    console.log('post 제출함', values);

    dispatch(addPostAction(values));
  };

  return (
    <StyledPostDiv>
      <Global />

      <Form form={form} onFinish={onPostFinish}>
        {/* <input type="text" className="form-control" placeholder="제목을 입력하세요" name="title" /> */}
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="제목을 입력하세요" />
        </Form.Item>
        <Form.Item name="tags">
          <Input placeholder="#태그" />
        </Form.Item>
        <Form.Item name="content">
          <TextEditor name="content" value={value} onChange={(value) => setvalue(value)} name="content" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            출간하기
          </Button>
        </Form.Item>
      </Form>
    </StyledPostDiv>
  );
});

export default writeForm;
