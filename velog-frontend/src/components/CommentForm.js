import { Button, Comment, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useUpdateEffect from '../lib/hooks/useUpdateEffect';
import { commentPostsAction } from '../reducers/comment';
import { StyledCommentForm } from './style';

const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, loading, value }) => (
  <StyledCommentForm>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} placeholder="댓글을 작성하세요" />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={loading} onClick={onSubmit}>
        댓글 쓰기
      </Button>
    </Form.Item>
  </StyledCommentForm>
);

const CommentForm = (props) => {
  const { postId } = props;

  const { commentLoading, commentPostDone } = useSelector(({ loading, comment }) => ({
    commentLoading: loading['COMMENT_POST_REQUEST'],
    commentPostDone: comment.commentPostDone,
  }));
  const dispatch = useDispatch();

  const [value, setValue] = useState('');

  useUpdateEffect(() => {
    if (commentPostDone) {
      setValue('');
    }
  }, [commentPostDone]);

  const handleSubmit = () => {
    if (!value) {
      return;
    }
    console.log(value);
    const content = value; //이름을 일치시켜야 된다..
    dispatch(commentPostsAction({ content, postId }));
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Comment content={<Editor onChange={handleChange} onSubmit={handleSubmit} loading={commentLoading} value={value} />} />
    </>
  );
};

export default CommentForm;
