import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import Comments from '../components/Comments';
import './ViewPost.css';

const ViewPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [upvotes, setUpvotes] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('MusicCommunity')
        .select()
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching post:', error);
        return;
      }

      if (data) {
        setPost(data);
        setUpvotes(data.upvotes || 0);
      }
    };

    fetchPost();
  }, [id]);

  const updateUpvotes = async (event) => {
    event.preventDefault();
    const newUpvotes = upvotes + 1;

    const { data, error } = await supabase
      .from('MusicCommunity')
      .update({ upvotes: newUpvotes })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating upvotes:', error);
      return;
    }

    if (data) {
      setUpvotes(newUpvotes);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="view-post">
      <div className="post-container">
        <h1 className="post-title">{post.title}</h1>
        <p className="post-date">Posted {new Date(post.created_at).toLocaleDateString()}</p>
        {post.image_url && (
          <img 
            src={post.image_url} 
            alt="Post content" 
            className="post-image"
          />
        )}
        <p className="post-description">{post.description}</p>
        <button className="upvote-button" onClick={updateUpvotes}>
          ⬆️ Upvotes: {upvotes}
        </button>
        
        <Comments postId={parseInt(id)} />
      </div>
    </div>
  );
};

export default ViewPost; 