import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import { takeLatest, throttle } from 'redux-saga/effects';
import createFakeRequestSaga, { createRequestActionTypes, createRequestSaga } from '../lib/createRequestSaga';
import * as postAPI from '../lib/api/post';

const [LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE] = createRequestActionTypes('LOAD_POSTS');
const [ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE] = createRequestActionTypes('ADD_POST');
const [GET_POST_REQUEST, GET_POST_SUCCESS, GET_POST_FAILURE] = createRequestActionTypes('GET_POST');
const LOAD_POSTS_INIT = 'LOAD_POSTS_INIT';

export const loadPostsInitAction = createAction(LOAD_POSTS_INIT);
export const loadPostsAction = createAction(LOAD_POSTS_REQUEST, (data) => data);
export const addPostAction = createAction(ADD_POST_REQUEST, (data) => data);
export const getPostAction = createAction(GET_POST_REQUEST, ({ userId, postId }) => ({ userId, postId }));

//const loadPostsSaga = createFakeRequestSaga(LOAD_POSTS_REQUEST, '');
const loadPostsSaga = createRequestSaga(LOAD_POSTS_REQUEST, postAPI.allList);
const addPostSaga = createRequestSaga(ADD_POST_REQUEST, postAPI.post);
const getPostSaga = createRequestSaga(GET_POST_REQUEST, postAPI.detail);

export function* postSaga() {
  //이벤트 리스너!
  yield throttle(3000, LOAD_POSTS_REQUEST, loadPostsSaga);
  yield takeLatest(ADD_POST_REQUEST, addPostSaga);
  yield takeLatest(GET_POST_REQUEST, getPostSaga);
}

const initialState = {
  //게시글 리스트 가져오기
  loadPostsDone: false,
  loadPostsError: null,

  //게시글 작성
  addPostDone: false,
  addPostError: null,
  addPostId: null,

  //게시글 상세보기
  getPostDone: false,
  getPostError: null,

  //page: 0, //10개 단위,
  post: null,
  hasMorePosts: true,
  cmRespDto: null,
  error: null,
  mainPosts: [],
};

const post = handleActions(
  {
    //메인 posts 초기화
    [LOAD_POSTS_INIT]: (state) => ({
      ...state,
      mainPosts: [],
    }),
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
      mainPosts: state.mainPosts.concat(data.data.content),
      cmRespDto: data,
      //page: state.page + 1,
      hasMorePosts: !data.data.last,
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
      addPostId: data.data,
    }),
    [ADD_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      addPostError: error,
    }),

    //게시글 상세보기
    [GET_POST_REQUEST]: (state, { payload: data }) =>
      produce(state, (draft) => {
        draft.cmRespDto = data;
        draft.getPostDone = false;
        draft.getPostError = null;
      }),
    [GET_POST_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      getPostError: null,
      getPostDone: true,
      cmRespDto: data,
      post: data.data,
    }),
    [GET_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      getPostError: error,
    }),
  },
  initialState,
);

export default post;
