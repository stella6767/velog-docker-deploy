import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import { takeLatest, throttle } from 'redux-saga/effects';
import createFakeRequestSaga, { createRequestActionTypes, createRequestSaga } from '../lib/createRequestSaga';
import * as userAPI from '../lib/api/user';

const [USER_REQUEST, USER_SUCCESS, USER_FAILURE] = createRequestActionTypes('USER');

export const userAction = createAction(USER_REQUEST);

const userReqSaga = createRequestSaga(USER_REQUEST, userAPI.user);

export function* userSaga() {
  //이벤트 리스너!
  yield takeLatest(USER_REQUEST, userReqSaga);
}

const initialState = {
  //유저 정보(회원벨로그) 가져오기 principal 하고 구분!
  userDone: false,
  userError: null,
  userData: null,

  user: null,
  posts: [],
  cmRespDto: null,
  error: null,
};

const user = handleActions(
  {
    //게시글 작성
    [USER_REQUEST]: (state, { payload: data }) =>
      produce(state, (draft) => {
        draft.cmRespDto = data;
        draft.userDone = false;
        draft.userError = null;
      }),
    [USER_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      userError: null,
      userDone: true,
      cmRespDto: data,
      userData: data.data,
      posts: data.data.user.posts,
    }),
    [USER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      userError: error,
    }),
  },
  initialState,
);

export default user;
