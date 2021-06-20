import client from './client';

//게시글 작성
export const post = (data) => client.post('post', JSON.stringify(data));

//quil editor 이미지 업로드용도
export const imgUpload = (data) => client.post('imgUpload', JSON.stringify(data));
