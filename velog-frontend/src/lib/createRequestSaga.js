import { call, put, takeLatest } from 'redux-saga/effects';
import { reissueAction } from '../reducers/auth';
import { finishLoading, startLoading } from '../reducers/loading';

//const reissueRequst = '토큰기간만료'; //utils에 이런 상수들을 모아놓을까..

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
      //call을 사용하면 promise를 반환하는 함수를 호출하고, 기다릴 수 있습니다.
      //첫 번째 피라미터는 함수, 나머지 피라미터는 해당 함수에 넣을 인수
      console.log('action.payload: ', action.payload);

      const response = yield call(request, action.payload); //api 호출

      console.log('api 호출 성공: ', type, action);
      console.log('response: ', response);

      yield put({
        type: SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      //if(e.)

      const errorData = e.response.data;
      console.error('errorData는', errorData);

      if (errorData.msg === '토큰기간만료') {
        const refreshToken = localStorage.getItem('refreshToken');
        //reissueAction(refreshToken); //여기가 오류구만!!

        yield put({
          type: 'REISSUE_REQUEST',
        });
      }
      yield put({
        type: FAILURE,
        payload: errorData,
        error: true,
      });
    }
    yield put(finishLoading(type)); //로딩 끝
  };
}

const newAccessTokenSet = (data) => {
  const accessToken = data.accessToken;
  console.log(accessToken);
  //기존 accessToken 지우고
  localStorage.setItem('accessToken', accessToken);
};
