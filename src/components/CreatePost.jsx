import React, { useState } from 'react';
import { supabase } from '../client';
import './CreatePost.css'

const CreatePost = () => {
    const [posts, setPosts] = useState({
        title: '', comments: '', image: '',
    });

    console.log(posts)

    function handleChange(event) {
        setPosts(prev => ({
            ...prev, [event.target.name]: event.target.value
        }));
    }

    const createPost = async (event) => {
        await supabase
        .from('posts')
        .insert([{
            title: posts.title,
            comments: posts.comments,
            image: posts.image,
        }]);
    }

    return (
        <div className='create-post-container'>
            <h2>Create Post!</h2>
            <form onSubmit={createPost}>

                <input
                    type="text"
                    placeholder="Title"
                    name='title'
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Write your thoughts..."
                    name='comments'
                    onChange={handleChange}
                />
                <h3>Image</h3>
                <input
                    type="text"
                    placeholder="Image URL"
                    name='image'
                    onChange={handleChange}
                />

                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default CreatePost;