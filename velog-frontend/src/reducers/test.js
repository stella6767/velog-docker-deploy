import { takeLatest } from '@redux-saga/core/effects';
import React from 'react';
import { createAction, handleActions } from 'redux-actions';
import * as testAPI from '../lib/api/test';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';

const initialState = {
  testDone: null,
  testError: null,
};

const [TEST_REQUST, TEST_SUCCESS, TEST_FAILURE] =
  createRequestActionTypes('TEST');
const [ADMIN_REQUST, ADMIN_SUCCESS, ADMIN_FAILURE] =
  createRequestActionTypes('ADMIN');

//액션 생성 함수
export const testAction = createAction(TEST_REQUST);
export const adminTestAction = createAction(ADMIN_REQUST);

//사가 생성
const getTestSaga = createRequestSaga(TEST_REQUST, testAPI.userTest);
const getAdminSaga = createRequestSaga(ADMIN_REQUST, testAPI.adminTest);

export function* testSaga() {
  //이벤트 리스너!
  yield takeLatest(TEST_REQUST, getTestSaga); //takeLatest는 기존에 진행 중이던 작업이 있다면 취소 처리하고 가장 마지막으로 실행된 작업만 수행
  yield takeLatest(ADMIN_REQUST, getAdminSaga); //takeLatest는 기존에 진행 중이던 작업이 있다면 취소 처리하고 가장 마지막으로 실행된 작업만 수행
}

//리듀서
const test = handleActions(
  {
    [TEST_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      testDone: data,
    }),
    [TEST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      testError: error,
    }),
  },
  initialState,
);

export default test;
