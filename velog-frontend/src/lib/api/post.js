import client from './client';

//게시글 작성
export const post = (data) => client.post('/post', JSON.stringify(data));

//게시글 상세보기
//export const detail = ({ userId, postId }) => client.get(`/post/${userId}/${postId}`);

export const detail = ({ userId, postId }) => {
  console.log('이게 되냐?', userId, postId);
  return client.get(`/post/${userId}/${postId}`);
};

//quil editor 이미지 업로드용도
export const imgUpload = (data) => client.post('/post/2/thumbnail', JSON.stringify(data), { headers });

const headers = {
  post: {
    'Content-Type': '',
  },
  data: 'data',
  encType: 'multipart/form-data', //필수 아님, 파일을 넣을거면 필수(e)
  dataType: 'json',
  processData: false,
};
