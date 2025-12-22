import React from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

interface Props {
  setSidebarOpennedId: React.Dispatch<React.SetStateAction<number>>;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
  setIsNewCommentOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarOpennedId: number;
  posts: Post[];
  userId: number | null;
}

export const PostsList: React.FC<Props> = ({
  posts,
  setSidebarOpennedId,
  setSelectedPost,
  setIsNewCommentOpen,
  sidebarOpennedId,
  userId,
}) => {
  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts
            .filter(post => post.userId === userId)
            .map(post => {
              return (
                <tr data-cy="Post" key={post.id}>
                  <td data-cy="PostId">{post.id}</td>

                  <td data-cy="PostTitle">{post.title}</td>

                  <td className="has-text-right is-vcentered">
                    <button
                      type="button"
                      data-cy="PostButton"
                      className={classNames('button is-link', {
                        'is-light': sidebarOpennedId !== post.id,
                      })}
                      onClick={() => {
                        setSelectedPost(post);
                        setSidebarOpennedId(
                          sidebarOpennedId === post.id ? 0 : post.id,
                        );
                        setIsNewCommentOpen(false);
                      }}
                    >
                      {sidebarOpennedId === post.id ? 'Close' : 'Open'}
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
