import { all } from '@redux-saga/core/effects';
import { combineReducers } from 'redux';
import auth, { authSaga } from './auth';
import loading from './loading';
import post, { postSaga } from './post';
import test, { testSaga } from './test';
const rootReducer = combineReducers({
  auth,
  loading,
  test,
  post,
});

export function* rootSaga() {
  yield all([authSaga(), testSaga(), postSaga()]);
}

export default rootReducer;
