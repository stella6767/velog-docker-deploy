import client from './client';

//개인 벨로그 정보 블러오기
export const user = (urlParam) => client.get(`/user/${urlParam}`);
