import client from './client';

//개인 벨로그 정보 블러오기
export const user = (userId) => client.get(`/user/${userId}`);

export const likelist = (page) => client.get(`/user/likelist?page=${page}`);

//유저 이미지 업로드
export const userImg = ({ userId, data }) => client.put(`/user/${userId}/profileImageUrl`, JSON.stringify(data), { headers });

const headers = {
  contentType: false, //필수, 안 걸면 디펄트 x-www-form-urlencoded로 파싱됨. 이 파싱을 막아야 되기 때문에 false.
  processData: false,
  encType: 'multipart/form-data', //필수 아님, 파일을 넣을거면 필수(e)
  dataType: 'json',
};
