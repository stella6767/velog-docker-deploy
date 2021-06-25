import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import { takeLatest, throttle } from 'redux-saga/effects';
import createFakeRequestSaga, { createRequestActionTypes, createRequestSaga } from '../lib/createRequestSaga';
import * as commentAPI from '../lib/api/comment';

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

  cmRespDto: null,
  error: null,
};

const comment = handleActions(
  {
    //댓글쓰기
    [COMMENT_POST_REQUEST]: (state, { payload: data }) =>
      produce(state, (draft) => {
        draft.commentPostDone = false;
        draft.commentPostError = null;
      }),
    [COMMENT_POST_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      commentPostError: null,
      commentPostDone: true,
      cmRespDto: data,
    }),
    [COMMENT_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      commentPostError: error,
    }),
  },
  initialState,
);

export default comment;
