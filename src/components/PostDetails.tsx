import React, { useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { deleteComment } from '../api/comments';

interface Props {
  setIsNewCommentOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  isNewCommentOpen: boolean;
  selectedPost: Post | null;
  isCommentLoading: boolean;
  comments: Comment[];
  CommentError: boolean;
}

export const PostDetails: React.FC<Props> = ({
  setIsNewCommentOpen,
  setComments,
  selectedPost,
  isNewCommentOpen,
  isCommentLoading,
  comments,
  CommentError,
}) => {
  const [submitError, setSubmitError] = useState(false);

  if (!selectedPost) {
    return null;
  }

  const handleDelete = (commentId: number) => {
    setComments(prev =>
      prev.filter(prevComment => prevComment.id !== commentId),
    );

    deleteComment(commentId).catch(() => {
      setComments(prev => prev.filter(prevComment => prevComment));
    });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${selectedPost.id}: ${selectedPost.title}`}</h2>

        <p data-cy="PostBody">{`${selectedPost.body}`}</p>
      </div>

      {isCommentLoading ? (
        <Loader />
      ) : (
        <div className="block">
          {submitError || CommentError ? (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          ) : comments.length === 0 ? (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          ) : (
            <p className="title is-4">Comments:</p>
          )}

          {!submitError &&
            !CommentError &&
            comments.map(comment => {
              return (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={comment.id}
                >
                  <div className="message-header">
                    <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                      {comment.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => handleDelete(comment.id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              );
            })}

          {!isNewCommentOpen && !CommentError && !submitError && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsNewCommentOpen(true)}
            >
              Write a comment
            </button>
          )}
        </div>
      )}

      {isNewCommentOpen && (
        <NewCommentForm
          setComments={setComments}
          postId={selectedPost.id}
          setSubmitError={setSubmitError}
        />
      )}
    </div>
  );
};
