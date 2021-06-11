import client from './client';

// 로그인
export const login = (data) => client.post('login', JSON.stringify(data));

// 회원가입
export const join = (data) => client.post('auth/join', JSON.stringify(data));

// 로그아웃
export const logout = () => client.post('auth/logout');
