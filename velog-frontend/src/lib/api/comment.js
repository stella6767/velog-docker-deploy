import client from './client';

export const save = ({ content, postId }) => {
  console.log('content', content, 'postId', postId);

  return client.post(`/comment/${postId}`, JSON.stringify(content));
};

export const recommentSave = ({ commentId, content }) => {
  console.log('commentId', commentId, 'content', content);

  client.post(`/comment/recomment/${commentId}`, JSON.stringify(content));
};
