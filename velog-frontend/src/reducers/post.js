import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createFakeRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';

const [LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE] = createRequestActionTypes('LOAD_POSTS');

export const loadPostAction = createAction(LOAD_POSTS_REQUEST, (data) => data);

const loadPostSaga = createFakeRequestSaga(LOAD_POSTS_REQUEST, '');

export function* postSaga() {
  //이벤트 리스너!
  yield takeLatest(LOAD_POSTS_REQUEST, loadPostSaga);
}

const initialState = {
  loadPostsDone: false,
  loadPostsError: null,

  cmRespDto: {},
  error: {},
  mainPosts: [],
};

const post = handleActions(
  {
    [LOAD_POSTS_REQUEST]: (state, { payload: data }) =>
      produce(state, (draft) => {
        draft.cmRespDto = data;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
      }),
    // 회원가입 성공
    [LOAD_POSTS_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      loadPostsError: null,
      loadPostsDone: true,
      cmRespDto: data,
    }),
    // 회원가입 실패
    [LOAD_POSTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loadPostsError: error,
    }),
  },
  initialState,
);

export default post;
