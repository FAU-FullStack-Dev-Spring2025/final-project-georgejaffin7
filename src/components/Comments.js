import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import './Comments.css';

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('Comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching comments:', error);
      return;
    }

    if (data) {
      setComments(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const { data, error } = await supabase
      .from('Comments')
      .insert([
        {
          content: newComment,
          post_id: postId
        }
      ])
      .select();

    if (error) {
      console.error('Error adding comment:', error);
      return;
    }

    if (data) {
      setComments([...comments, ...data]);
      setNewComment(''); // Clear the input
    }
  };

  return (
    <div className="comments-section">
      <h3>Comments</h3>
      
      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          rows="3"
        />
        <button type="submit">Post Comment</button>
      </form>

      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p className="comment-content">{comment.content}</p>
            <span className="comment-date">
              {new Date(comment.created_at).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments; 