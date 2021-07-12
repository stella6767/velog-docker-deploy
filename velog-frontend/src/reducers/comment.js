import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as commentAPI from '../lib/api/comment';
import { createRequestActionTypes, createRequestSaga } from '../lib/createRequestSaga';

const [COMMENT_POST_REQUEST, COMMENT_POST_SUCCESS, COMMENT_POST_FAILURE] = createRequestActionTypes('COMMENT_POST');

export const commentPostsAction = createAction(COMMENT_POST_REQUEST, ({ content, postId }) => ({ content, postId }));

const commentPostsSaga = createRequestSaga(COMMENT_POST_REQUEST, commentAPI.save);

export function* commentSaga() {
  //이벤트 리스너!
  yield takeLatest(COMMENT_POST_REQUEST, commentPostsSaga);
}

const initialState = {
  //게시글 작성
  commentPostDone: false,
  commentPostError: null,

  comment: null,
  cmRespDto: null,
  error: null,
};

const comment = handleActions(
  {
    //댓글쓰기
    [COMMENT_POST_REQUEST]: (state) =>
      produce(state, (draft) => {
        draft.commentPostDone = false;
        draft.commentPostError = null;
      }),
    [COMMENT_POST_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      commentPostError: null,
      commentPostDone: true,
      cmRespDto: data,
      comment: data.data,
    }),
    [COMMENT_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      commentPostError: error,
    }),
  },
  initialState,
);

export default comment;
