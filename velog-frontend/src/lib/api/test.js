import client from './client';

// 로그인
export const userTest = () => client.get('user/test');
