import React, { useEffect, useState } from 'react';
import { supabase } from '../client';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Detail.css';

const Detail = () => {
    const { id } = useParams();
    const [posts, setPosts] = useState(null);

    const [replyText, setReplyText] = useState('');
    const [replies, setReplies] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
        fetchReplies();
    }, []);

    async function fetchData() {
        try {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                throw error;
            }

            setPosts(data);
        } catch (error) {
            console.error('Error fetching post:', error.message);
        }
    }

    async function fetchReplies() {
        try {
            const { data, error } = await supabase
                .from('replies')
                .select('*')
                .eq('post_id', id);

            if (error) {
                throw error;
            }

            setReplies(data);
        } catch (error) {
            console.error('Error fetching replies:', error.message);
        }
    }

    const handleReplySubmit = async (e) => {
        e.preventDefault();
        try {
            const { error } = await supabase
                .from('replies')
                .insert({
                    post_id: id,
                    reply: replyText,
                });

            if (error) {
                throw error;
            }

            setReplyText('');
            fetchReplies();
        } catch (error) {
            console.error('Error adding reply:', error.message);
        }
    };

    const handleDeleteClick = async () => {
        try {
            const { error } = await supabase
                .from('posts')
                .delete()
                .eq('id', id);

            if (error) {
                throw error;
            }
            // deletes posts along with replies
            const { error: repliesError } = await supabase
                .from('replies')
                .delete()
                .eq('post_id', id);

            if (repliesError) {
                throw repliesError;
            }

            navigate('/');
        } catch (error) {
            console.error('Error deleting post:', error.message);
        }
    }

    const handleUpvote = async () => {
        try {
            const { error } = await supabase
                .from('posts')
                .update({ upvotes: posts.upvotes + 1 })
                .eq('id', id);

            if (error) {
                throw error;
            }

            fetchData();
        } catch (error) {
            console.error('Error upvoting post:', error.message);
        }
    }

    if (!posts) {
        return <div></div>;
    }

    return (
        <>
            <div className='detail-container'>
                <p>posted on {new Date(posts.created_at).toLocaleString()}</p>
                <h2>{posts.title}</h2>
                <h3>{posts.comments}</h3>
                {posts.image === '' ? (null) : (<img src={posts.image} width="500px" height="300px" alt={posts.title} />)}
                <p onClick={handleUpvote} style={{ cursor: 'pointer' }}>{posts.upvotes} 😎 upvotes</p>

                <div className='detail-buttons'>
                    <Link to={`/edit/${posts.id}`}>
                        <button>✏️ Edit</button>
                    </Link>
                    <button onClick={handleDeleteClick}>❌ Delete</button>
                </div>

            </div>

            <div className="reply-section">
                <h3>Replies</h3>
                <form onSubmit={handleReplySubmit}>
                    <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write your reply..."
                        required
                    ></textarea>
                    <button type="submit">Submit</button>
                </form>
                <div className="replies-list">
                    {replies.map((rep) => (
                        <div key={rep.id} className="reply">
                            <p>• {rep.reply}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Detail;
