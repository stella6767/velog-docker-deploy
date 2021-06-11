import produce from "immer";
import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as authAPI from "../lib/api/auth";
import { takeLatest } from "@redux-saga/core/effects";

//초기 상태
const initialState = {
  login: {},
  joinDone: null,
  joinError: null,
  loginDone: false,
  loginError: null,
};


const [JOIN_REQUEST, JOIN_SUCCESS, JOIN_FAILURE] =
  createRequestActionTypes("JOIN");

const [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes("LOGIN");

//액션 생성 함수
export const join = createAction(JOIN_REQUEST, (data) => (data));
export const login = createAction(LOGIN_REQUEST, (data) => (
  data
));

//사가 생성
const joinSaga = createRequestSaga(JOIN_REQUEST, authAPI.join);
const loginSaga = createRequestSaga(LOGIN_REQUEST, authAPI.login);

export function* authSaga() {
  //이벤트 리스너!
  yield takeLatest(JOIN_REQUEST, joinSaga); //takeLatest는 기존에 진행 중이던 작업이 있다면 취소 처리하고 가장 마지막으로 실행된 작업만 수행
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}

//리듀서
const auth = handleActions(
  {
    // 회원가입 성공
    [JOIN_SUCCESS]: (state, { payload: joinDone }) => ({
      ...state,
      joinError: null,
      joinDone,
    }),
    // 회원가입 실패
    [JOIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      joinError: error,
    }),
    [LOGIN_SUCCESS]: (state) => ({
      ...state,
      loginError: null,
      loginDone: true,
    }),
    // 회원가입 실패
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loginError: error,
    }), 


  },
  initialState
);

export default auth;
