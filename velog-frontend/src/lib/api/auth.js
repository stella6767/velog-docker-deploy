import client from './client';

// 로그인
export const login = (data) => client.post('login', JSON.stringify(data));

// 로그아웃
export const logout = (data) => client.post('logout', JSON.stringify(data));

// 회원가입
export const join = (data) => client.post('auth/join', JSON.stringify(data));

//토큰 재발급
export const reissue = (data) =>
  client.post('auth/reissue', JSON.stringify(data));
