import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const getPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const addPost = ({ userId, title, body }: Omit<Post, 'id'>) => {
  return client.post<Post>(`/posts`, {
    userId,
    title,
    body,
  });
};

export const deletePost = (postId: number) => {
  return client.delete(`/posts/${postId}`);
};
