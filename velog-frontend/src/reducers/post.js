import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import { takeLatest, throttle } from 'redux-saga/effects';
import createFakeRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';

const [LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE] = createRequestActionTypes('LOAD_POSTS');

export const loadPostAction = createAction(LOAD_POSTS_REQUEST, (data) => data);

const loadPostSaga = createFakeRequestSaga(LOAD_POSTS_REQUEST, '');

export function* postSaga() {
  //이벤트 리스너!
  yield throttle(3000, LOAD_POSTS_REQUEST, loadPostSaga);
}

const initialState = {
  loadPostsDone: false,
  loadPostsError: null,

  hasMorePosts: true,
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
    [LOAD_POSTS_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      loadPostsError: null,
      loadPostsDone: true,
      mainPosts: state.mainPosts.concat(data),
      cmRespDto: data,
      hasMorePosts: state.mainPosts.length < 100,
    }),
    [LOAD_POSTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loadPostsError: error,
    }),
  },
  initialState,
);

export default post;
