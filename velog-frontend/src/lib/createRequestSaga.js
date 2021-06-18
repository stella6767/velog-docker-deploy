import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { OAUTH_REQUEST } from '../reducers/auth';
import { finishLoading, startLoading } from '../reducers/loading';
import * as authAPI from '../lib/api/auth';
import shortId from 'shortid';
import faker from 'faker';

export const createRequestActionTypes = (type) => {
  const REQUEST = `${type}_REQUEST`;
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [REQUEST, SUCCESS, FAILURE];
};

export function createRequestSaga(type, request) {
  const SUCCESS = `${type.split('_')[0]}_SUCCESS`; //ESLINT가 에러 표시내는 거는 무시
  const FAILURE = `${type.split('_')[0]}_FAILURE`;

  return function* (action) {
    yield put(startLoading(type)); //로딩 시작
    //피라미터로 action을 받아 오면 액션의 정보를 조회할 수 있습니다.

    try {
      const response = yield call(request, action.payload); //api 호출
      console.log('api 호출 성공: ', type, action);
      console.log('response: ', response);

      yield put({
        type: SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      const errorData = e.response.data;
      console.error('errorData는', errorData);

      yield put({
        type: FAILURE,
        payload: errorData,
        error: true,
      });
    }
    yield put(finishLoading(type)); //로딩 끝
  };
}

export function* oauthLogin(action) {
  console.log('작동안하니?' + action);

  try {
    const response = yield call(authAPI.socialLogin, action.data);
    console.log('response: ', response);
    yield put({
      type: 'LOGIN_SUCCESS',
      payload: response.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: 'LOGIN_FAILURE',
      payload: err.response.data,
      error: true,
    });
  }
}

export default function createFakeRequestSaga(type, request) {
  const SUCCESS = `${type.split('_')[0]}_SUCCESS`; //ESLINT가 에러 표시내는 거는 무시
  const FAILURE = `${type.split('_')[0]}_FAILURE`;

  return function* (action) {
    yield put(startLoading(type)); //로딩 시작
    //피라미터로 action을 받아 오면 액션의 정보를 조회할 수 있습니다.

    try {
      //const response = yield call(request, action.payload); //api 호출
      console.log('api 호출 성공: ', type, action);
      yield delay(500);

      yield put({
        type: SUCCESS,
        payload: generateDummyPost(action.data),
      });
    } catch (e) {
      const errorData = e.response.data;
      console.error('errorData는', errorData);

      yield put({
        type: FAILURE,
        payload: errorData,
        error: true,
      });
    }
    yield put(finishLoading(type)); //로딩 끝
  };
}

const generateDummyPost = (number) =>
  Array(number)
    .fill()
    .map(() => ({
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: faker.name.findName(),
      },
      content: faker.lorem.paragraph(),
      Images: [
        {
          src: faker.image.image(),
        },
      ],
      Comments: [
        {
          User: {
            id: shortId.generate(),
            nickname: faker.name.findName(),
          },
          content: faker.lorem.sentence(),
        },
      ],
    }));
