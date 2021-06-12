import client from './client';

// 로그인
export const userTest = (config) => client.get('user/test', config); //action.payload == config
