import { Comment, Tooltip } from 'antd';
import moment from 'moment';
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { commentDeleteAction } from '../reducers/comment';

const CommentCard = memo((props) => {
  const { comment, userId } = props;

  const dispatch = useDispatch();

  const onDeleteClick = () => {
    console.log('댓글 삭제', comment.id);

    dispatch(commentDeleteAction(comment.id));
  };

  // useUpdateEffect(() => { //여기서 할 필요없구만..
  //   if (commentDeleteError) {
  //     alert('댓글 삭제에 실패하였습니다.');
  //   }

  //   if (commentDeleteDone) {
  //     setComments(...);
  //   }
  // }, [commentDeleteDone, commentDeleteError]);

  return (
    <>
      <Comment
        actions={[
          <span key="comment-nested-reply-to" onClick={onDeleteClick}>
            삭제
          </span>,
        ]}
        author={<Link to={`/${userId}`}>{comment.user.username}</Link>}
        content={<p dangerouslySetInnerHTML={{ __html: comment.content }} />}
        style={{ paddingBottom: '3rem' }}
        datetime={
          <Tooltip title={moment(comment.createDate).format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      ></Comment>
    </>
  );
});

export default CommentCard;
