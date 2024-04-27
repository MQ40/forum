import React, { useEffect, useState } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../client.jsx';
import './Edit.css';

const Edit = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchPost();
    }, []);

    async function fetchPost() {
        try {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                throw error;
            }

            setPost(data);
        } catch (error) {
            console.error('Error fetching post:', error.message);
        }
    }

    const handleTitleChange = (e) => {
        setPost({ ...post, title: e.target.value });
    };

    const handleCommentsChange = (e) => {
        setPost({ ...post, comments: e.target.value });
    };

    const handleImageChange = (e) => {
        setPost({ ...post, image: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { error } = await supabase
                .from('posts')
                .update(post)
                .eq('id', id);

            if (error) {
                throw error;
            }

            navigate('/');
        } catch (error) {
            console.error('Error updating post:', error.message);
        }
    };

    if (!post) {
        return <div></div>;
    }

    return (
        <div className='edit-container'>
            <h2>✏️ Edit Post</h2>
            <form onSubmit={handleSubmit}>


                <input
                    type="text"
                    placeholder="Title"
                    name='title'
                    onChange={handleTitleChange}
                />

                <input
                    type="text"
                    placeholder="Write your thoughts..."
                    name='comments'
                    onChange={handleCommentsChange}
                />

                <h3>Image</h3>
                <input
                    type="text"
                    placeholder="Image URL"
                    name='image'
                    onChange={handleImageChange}
                />

                <button type='submit'>Submit</button>
            </form>
        </div>
    )

}

export default Edit;