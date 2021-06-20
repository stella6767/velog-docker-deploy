import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import { takeLatest, throttle } from 'redux-saga/effects';
import createFakeRequestSaga, { createRequestActionTypes, createRequestSaga } from '../lib/createRequestSaga';
import * as postAPI from '../lib/api/post';

const [LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE] = createRequestActionTypes('LOAD_POSTS');
const [ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE] = createRequestActionTypes('ADD_POST');

export const loadPostsAction = createAction(LOAD_POSTS_REQUEST, (data) => data);
export const addPostAction = createAction(ADD_POST_REQUEST, (data) => data);

const loadPostsSaga = createFakeRequestSaga(LOAD_POSTS_REQUEST, '');
const addPostSaga = createRequestSaga(ADD_POST_REQUEST, postAPI.post);

export function* postSaga() {
  //이벤트 리스너!
  yield throttle(3000, LOAD_POSTS_REQUEST, loadPostsSaga);
  yield takeLatest(ADD_POST_REQUEST, addPostSaga);
}

const initialState = {
  //게시글 리스트 가져오기
  loadPostsDone: false,
  loadPostsError: null,

  //게시글 작성
  addPostDone: false,
  addPostError: null,

  hasMorePosts: true,
  cmRespDto: {},
  error: {},
  mainPosts: [],
};

const post = handleActions(
  {
    //홈 페이지 게시글 리스트 불러오기
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
      loadPostssError: error,
    }),

    //게시글 작성
    [ADD_POST_REQUEST]: (state, { payload: data }) =>
      produce(state, (draft) => {
        draft.cmRespDto = data;
        draft.addPostDone = false;
        draft.addPostError = null;
      }),
    [ADD_POST_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      addPostError: null,
      addPostDone: true,
      cmRespDto: data,
    }),
    [ADD_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      addPostError: error,
    }),
  },
  initialState,
);

export default post;
