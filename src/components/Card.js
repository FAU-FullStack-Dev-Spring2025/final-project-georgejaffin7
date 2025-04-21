import React, { useState } from 'react';
import './Card.css';
import more from './more.png';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const getRelativeTime = (timestamp) => {
  if (!timestamp) return 'unknown time';
  
  const now = new Date();
  // Parse the ISO timestamp, replacing space with T for proper ISO 8601 format
  const date = new Date(timestamp.replace(' ', 'T'));
  
  if (isNaN(date.getTime())) return 'invalid date';

  const secondsAgo = Math.floor((now - date) / 1000);

  if (secondsAgo < 60) {
    return 'just now';
  } else if (secondsAgo < 3600) {
    const minutes = Math.floor(secondsAgo / 60);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (secondsAgo < 86400) {
    const hours = Math.floor(secondsAgo / 3600);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (secondsAgo < 2592000) {
    const days = Math.floor(secondsAgo / 86400);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else {
    const months = Math.floor(secondsAgo / 2592000);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  }
};

const Card = (props) => {
  const [upvotes, setUpvotes] = useState(props.upvotes || 0);
  const navigate = useNavigate();

  const updateUpvotes = async (event) => {
    event.preventDefault();
    event.stopPropagation();  // Prevent navigation when clicking upvote
    const newUpvotes = upvotes + 1;

    const { data, error } = await supabase
      .from('MusicCommunity')
      .update({ upvotes: newUpvotes })
      .eq('id', props.id)
      .select();

    if (error) {
      console.error('Error updating upvotes:', error);
      return;
    }

    if (data) {
      setUpvotes(newUpvotes);
    }
  };

  const handleCardClick = () => {
    navigate(`/post/${props.id}`);
  };

  console.log('created_at value:', props.created_at);

  return (
    <div className="Card" onClick={handleCardClick}>
      <Link to={'edit/' + props.id} onClick={(e) => e.stopPropagation()}>
        <img className="moreButton" alt="edit button" src={more} />
      </Link>
      <h2 className="title">{props.title}</h2>
      <h3 className="date">Posted {getRelativeTime(props.created_at)}</h3>
      {console.log('Image URL in Card:', props.image_url)}
      {props.image_url && (
        <img 
          src={props.image_url} 
          alt="Post content" 
          className="post-image"
          onError={(e) => {
            console.error('Image failed to load:', e.target.src);
            e.target.style.display = 'none';
          }}
        />
      )}
      <p className="description">{props.description}</p>
      <button className="upvoteButton" onClick={updateUpvotes}>
        ⬆️ Upvotes: {upvotes}
      </button>
    </div>
  );
};

export default Card;
