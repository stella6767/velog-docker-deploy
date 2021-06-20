import client from './client';

//게시글 작성
export const post = (data) => client.post('post', JSON.stringify(data));

//
