import client from './client';

export const user = () => client.get('user/test');
