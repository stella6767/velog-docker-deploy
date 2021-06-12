import { put, call } from 'redux-saga/effects';
import { finishLoading, startLoading } from '../reducers/loading';
import client from './api/client';

export const createRequestActionTypes = (type) => {
  const REQUEST = `${type}_REQUEST`;
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [REQUEST, SUCCESS, FAILURE];
};

export default function createRequestSaga(type, request) {
  // const typeArray = type.split('_');
  // console.log("type 확인:",typeArray[0]);
  // const prefixType = typeArray[0];

  const SUCCESS = `${type.split('_')[0]}_SUCCESS`; //ESLINT가 에러 표시내는 거는 무시
  const FAILURE = `${type.split('_')[0]}_FAILURE`;

  //console.log(client.headers);

  return function* (action) {
    console.log('actionType: ', type);

    yield put(startLoading(type)); //로딩 시작
    //피라미터로 action을 받아 오면 액션의 정보를 조회할 수 있습니다.

    try {
      //console.log("호출이 된 것이냐..", request);

      //call을 사용하면 promise를 반환하는 함수를 호출하고, 기다릴 수 있습니다.
      //첫 번째 피라미터는 함수, 나머지 피라미터는 해당 함수에 넣을 인수

      //console.log("json으로 던졌는데?",JSON.stringify(action.payload));

      if (type === 'TEST_REQUEST') {
        //일단은 엉성하지만 이렇게 짜자..
        const config = {
          headers: {
            Authorization: '' + localStorage.getItem('velogToken'),
          },
        };

        action.payload = config;
      }

      console.log('action.payload: ', action.payload);

      const response = yield call(request, action.payload); //api 호출

      console.log('api 호출 성공: ', type, action);
      console.log('response: ', response);
      console.log('header.authoriaztion: ', response.headers.authorization);

      const accessToken = response.headers.authorization;

      localStorage.setItem('velogToken', accessToken);

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