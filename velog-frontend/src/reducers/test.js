import { takeLatest } from '@redux-saga/core/effects';
import React from 'react';
import { createAction, handleActions } from 'redux-actions';
import * as testAPI from '../lib/api/test';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';

const initialState = {};

const [TEST_REQUST, TEST_SUCCESS, TEST_FAILURE] =
  createRequestActionTypes('TEST');

//액션 생성 함수
export const test = createAction(TEST_REQUST);

//사가 생성
const getTestSaga = createRequestSaga(TEST_REQUST, testAPI.userTest);

export function* testSaga() {
  //이벤트 리스너!
  yield takeLatest(TEST_REQUST, getTestSaga); //takeLatest는 기존에 진행 중이던 작업이 있다면 취소 처리하고 가장 마지막으로 실행된 작업만 수행
}

//리듀서
const auth = handleActions(
  {
    // 회원가입 성공
    [TEST_SUCCESS]: (state) => ({}),
    // 회원가입 실패
    [TEST_FAILURE]: (state) => ({}),
  },
  initialState,
);

export default test;
