import React, { useState } from 'react';
import './CreatePost.css';
import { supabase } from '../client';

const CreatePost = () => {
  const [post, setPost] = useState({ title: "", description: "", image_url: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createPost = async (event) => {
    event.preventDefault();

    await supabase
      .from('MusicCommunity')
      .insert({ 
        title: post.title, 
        description: post.description,
        image_url: post.image_url 
      })
      .select();

    window.location = "/";
  };

  return (
    <div>
      <form onSubmit={createPost}>
        <label htmlFor="title">Title</label><br />
        <input type="text" id="title" name="title" onChange={handleChange} /><br /><br />

        <label htmlFor="description">Description</label><br />
        <textarea
          rows="5"
          cols="50"
          id="description"
          name="description"
          onChange={handleChange}
        ></textarea><br /><br />

        <label htmlFor="image_url">Image URL</label><br />
        <input 
          type="url" 
          id="image_url" 
          name="image_url" 
          placeholder="https://example.com/image.jpg"
          onChange={handleChange}
        /><br /><br />

        <input type="submit" value="Submit" onClick={createPost} />
      </form>
    </div>
  );
};

export default CreatePost;
