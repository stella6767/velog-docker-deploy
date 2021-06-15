import { takeLatest } from '@redux-saga/core/effects';
import { createAction, handleActions } from 'redux-actions';
import * as authAPI from '../lib/api/auth';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';

const [JOIN_REQUEST, JOIN_SUCCESS, JOIN_FAILURE] =
  createRequestActionTypes('JOIN');
const [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes('LOGIN');
const [REISSUE_REQUEST, REISSUE_SUCCESS, REISSUE_FAILURE] =
  createRequestActionTypes('REISSUE');
const [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE] =
  createRequestActionTypes('LOGOUT');

// //액션 생성 함수
export const joinAction = createAction(JOIN_REQUEST, (data) => data);
export const loginAction = createAction(LOGIN_REQUEST, (data) => data);
export const reissueAction = createAction(REISSUE_REQUEST, (data) => data); //토큰 재발급 액션실행함수
export const logoutAction = createAction(LOGOUT_REQUEST, (data) => data);

// //사가 생성
const joinSaga = createRequestSaga(JOIN_REQUEST, authAPI.join);
const loginSaga = createRequestSaga(LOGIN_REQUEST, authAPI.login);
const reissueSaga = createRequestSaga(REISSUE_REQUEST, authAPI.reissue); //토큰재발급 요청
const logoutSaga = createRequestSaga(LOGOUT_REQUEST, authAPI.logout); //토큰재발급 요청

export function* authSaga() {
  //이벤트 리스너!
  yield takeLatest(JOIN_REQUEST, joinSaga); //takeLatest는 기존에 진행 중이던 작업이 있다면 취소 처리하고 가장 마지막으로 실행된 작업만 수행
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(REISSUE_REQUEST, reissueSaga);
  yield takeLatest(LOGOUT_REQUEST, logoutSaga);
}

//초기 상태
const initialState = {
  login: {},

  joinDone: null,
  joinError: null,

  loginDone: false,
  loginError: null,

  reissueError: null,
  reissueDone: false,

  cmRespDto: {},
  principal: null,
};

//리듀서
const auth = handleActions(
  {
    // 회원가입 성공
    [JOIN_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      joinError: null,
      joinDone: true,
      cmRespDto: data,
    }),
    // 회원가입 실패
    [JOIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      joinError: error,
    }),
    [LOGIN_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      loginError: null,
      loginDone: true,
      cmRespDto: data,
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loginError: error,
    }),
    // [REISSUE_SUCCESS]: (state, { payload: data }) => ({
    //   ...state,
    //   reissueError: null,
    //   reissueDone: true,
    //   cmRespDto: data,
    // }),
    // [REISSUE_FAILURE]: (state, { payload: error }) => ({
    //   ...state,
    //   reissueError: error,
    // }),
  },
  initialState,
);

export default auth;
