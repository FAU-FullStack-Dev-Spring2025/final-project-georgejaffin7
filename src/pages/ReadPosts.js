import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client';
import './ReadPosts.css';

const ReadPosts = () => {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('recent'); // 'recent' or 'popular'
  const [searchQuery, setSearchQuery] = useState('');
  const [allPosts, setAllPosts] = useState([]); // Store all posts for filtering

  useEffect(() => {
    fetchPosts();
  }, [sortBy]); // Re-fetch when sort option changes

  useEffect(() => {
    // Filter posts when search query changes
    if (allPosts.length > 0) {
      const filtered = allPosts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Apply current sorting to filtered results
      const sorted = [...filtered].sort((a, b) => {
        if (sortBy === 'recent') {
          return new Date(b.created_at) - new Date(a.created_at);
        } else {
          return (b.upvotes || 0) - (a.upvotes || 0) || 
                 new Date(b.created_at) - new Date(a.created_at);
        }
      });

      setPosts(sorted);
    }
  }, [searchQuery, allPosts, sortBy]);

  const fetchPosts = async () => {
    let query = supabase
      .from('MusicCommunity')
      .select();

    if (sortBy === 'recent') {
      query = query.order('created_at', { ascending: false }); // newest first
    } else {
      query = query.order('upvotes', { ascending: false }).order('created_at', { ascending: false }); // highest upvotes first, then newest
    }

    const { data } = await query;
    console.log('Data from Supabase:', data);
    setAllPosts(data || []);
    setPosts(data || []);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search posts by title..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="sort-buttons">
        <button 
          className={`sort-button ${sortBy === 'recent' ? 'active' : ''}`}
          onClick={() => setSortBy('recent')}
        >
          Most Recent
        </button>
        <button 
          className={`sort-button ${sortBy === 'popular' ? 'active' : ''}`}
          onClick={() => setSortBy('popular')}
        >
          Most Popular
        </button>
      </div>

      <div className="ReadPosts">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Card
              key={post.id}
              id={post.id}
              title={post.title}
              description={post.description}
              created_at={post.created_at}
              upvotes={post.upvotes}
              image_url={post.image_url}
            />
          ))
        ) : (
          <h2>{searchQuery ? 'No matching posts found 🔍' : 'No Posts Yet 😞'}</h2>
        )}
      </div>
    </div>
  );
};

export default ReadPosts;
