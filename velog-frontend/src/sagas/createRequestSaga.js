import { put, call } from "redux-saga/effects";
import { finishLoading, startLoading } from "../reducers/loading";

export const createRequestActionTypes = (type) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  console.log("호출이 된 것이냐..");

  return function* (action) {
    yield put(startLoading(type)); //로딩 시작
    //피라미터로 action을 받아 오면 액션의 정보를 조회할 수 있습니다.

    try {
      //call을 사용하면 promise를 반환하는 함수를 호출하고, 기다릴 수 있습니다.
      //첫 번째 피라미터는 함수, 나머지 피라미터는 해당 함수에 넣을 인수
      const response = yield call(request, action.payload); //api 호출

      console.log("api 호출", type, action);

      yield put({
        type: SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(type)); //로딩 끝
  };
}
