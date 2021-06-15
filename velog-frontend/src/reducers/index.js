import { all } from '@redux-saga/core/effects';
import { combineReducers } from 'redux';
import auth, { authSaga } from './auth';
import loading from './loading';
import test, { testSaga } from './test';
const rootReducer = combineReducers({
  auth,
  loading,
  test,
});

export function* rootSaga() {
  yield all([authSaga(), testSaga()]);
}

export default rootReducer;
