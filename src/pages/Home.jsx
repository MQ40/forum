import React, { useEffect, useState } from 'react';
import { supabase } from '../client';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = ({ searchQuery }) => {
    const [posts, setPosts] = useState([]);
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        fetchPosts();
    }, [sortBy, searchQuery]);

    const fetchPosts = async () => {
        try {
            let { data, error } = [];
            //Search bar in the navbar
            if (searchQuery) {
                ({ data, error } = await supabase
                .from('posts')
                .select('*')
                .ilike('title', `%${searchQuery}%`)
                .order('created_at', { ascending: false }));
            } else {
                //sort by newest / popular posts
                if (sortBy === 'newest') {
                    ({ data, error } = await supabase
                    .from('posts')
                    .select('*')
                    .order('created_at', { ascending: false }));
                } else if (sortBy === 'popular') {
                    ({ data, error } = await supabase
                    .from('posts')
                    .select('*')
                    .order('upvotes', { ascending: false }));
                }
            }

            if (error) {
                throw error;
            }

            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error.message);
        }
    };

    const handleSort = (type) => {
        setSortBy(type);
    };

    return (
        <div className='home-container'>

            <div className="sort-buttons">
                <p className='sort-title'>Order by:</p>
                <button onClick={() => handleSort('newest')}>Newest ⏱️</button>
                <button style={{ margin: '10px 10px' }} onClick={() => handleSort('popular')}>Popular ♨️</button>
            </div>

            <div className='post-list'>
                {posts.map(post => (
                    <div key={post.id} className='post-details'>
                        <Link to={`/post/${post.id}`} className='post-link'>
                            <p>posted on {new Date(post.created_at).toLocaleString()}</p>
                            <h3>{post.title}</h3>
                            <p>{post.upvotes} 😎 upvotes</p>
                        </Link>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Home;
