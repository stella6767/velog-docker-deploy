import produce from "immer";
import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../sagas/createRequestSaga";
import * as authAPI from "../lib/api/auth";
import { takeLatest } from "@redux-saga/core/effects";

// 액션 타입 정의
const CHANGE_FIELD = "auth/CHANGE_FIELD";
const INLTIALIZE_FORM = "auth/INLTIALIZE_FORM";

const [JOIN, JOIN_SUCCESS, JOIN_FAILURE] =
  createRequestActionTypes("auth/JOIN");

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes("auth/LOGIN");

//액션 생성 함수
export const changeField = createAction(
  CHANGE_FIELD, //type
  ({ form, value }) => ({
    form,
    value,
  })
); //JOIN

export const initializeForm = createAction(INLTIALIZE_FORM, (form) => form);

export const join = createAction(JOIN, ({ username, email }) => ({
  username,
  email,
}));
export const login = createAction(LOGIN, ({ email }) => ({
  email,
}));

//사가 생성
const joinSaga = createRequestSaga(JOIN, authAPI.join);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);

export function* authSaga() {
  //요걸 등록시킴!
  yield takeLatest(JOIN, joinSaga); //takeLatest는 기존에 진행 중이던 작업이 있다면 취소 처리하고 가장 마지막으로 실행된 작업만 수행
  yield takeLatest(LOGIN, loginSaga);
}

//초기 상태
const initialState = {
  join: {
    username: "",
    email: "",
  },
  login: {
    email: "",
  },
  auth: null,
  authError: null,
};

//리듀서
const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, value } }) =>
      produce(state, (draft) => {
        draft[form] = value; //state.JOIN = values
      }),
    [INLTIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form], //JOIN: JOIN{username:'', email:''}
    }),
    // 회원가입 성공
    [JOIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    // 회원가입 실패
    [JOIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    // 로그인 성공
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    // 로그인 실패
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  initialState
);

export default auth;
