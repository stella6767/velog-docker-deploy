import React, { memo } from 'react';
import AppHeader from '../../components/AppHeader';
import { StyledPostDetailContainer, Global, StyledHeadDescDiv, StyledDetailContentDiv, StyledDetailCommentDiv } from './style';
import { Link } from 'react-router-dom';
import CommentForm from '../../components/CommentForm';
import CommentCard from '../../components/CommentCard';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPostAction } from '../../reducers/post';
import { useSelector } from 'react-redux';
import { HeartOutlined } from '@ant-design/icons';

const PostDetail = memo((props) => {
  const { post, getPostDone } = useSelector(({ post, loading }) => ({
    post: post.post,
    getPostDone: post.getPostDone,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('props', props);
    console.log('postId', props.match.params.postId);
    console.log('userId', props.match.params.userId);
    //dispatch(getPostAction(props.match.params.userId, props.match.params.postId));
    const postId = props.match.params.postId;
    const userId = props.match.params.userId;

    dispatch(getPostAction({ userId, postId }));
  }, []);

  return (
    <>
      {getPostDone && (
        <>
          <Global />
          <AppHeader />
          <StyledPostDetailContainer>
            <div className="head-wrapper">
              <h1>{post.title}</h1>
              <StyledHeadDescDiv>
                <div className="information">
                  <span className="username">
                    <Link to="/@eungyeole">{post.user.username}</Link>
                  </span>
                  <span className="separator" style={{ marginLeft: '1rem' }}>
                    ·
                  </span>
                  <span style={{ marginLeft: '1rem' }}>6일 전</span>
                </div>
                <div>
                  <button className="like-btn">
                    <HeartOutlined />
                    <span>138</span>
                  </button>
                </div>
              </StyledHeadDescDiv>
            </div>

            <StyledDetailContentDiv dangerouslySetInnerHTML={{ __html: post.content }} />
            <StyledDetailCommentDiv>
              <h3>{post.comments.length}개의 댓글</h3>
              <CommentForm />
              <CommentCard />
            </StyledDetailCommentDiv>
          </StyledPostDetailContainer>
        </>
      )}
    </>
  );
});

export default PostDetail;
