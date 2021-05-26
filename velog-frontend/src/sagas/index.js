import { all, fork } from "@redux-saga/core/effects";
import { authSaga } from "../reducers/auth";
import createRequestSaga from "./createRequestSaga";

export default function* rootSaga() {
  yield all([
    //fork(createRequestSaga),
    createRequestSaga,
    authSaga(),
  ]);
}
