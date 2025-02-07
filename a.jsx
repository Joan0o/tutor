import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from './utils/supabaseClient';
import LoadingSpinner from './LoadingSpinner';
import { ThemeContext } from '../contexts/ThemeContext';
import { UserContext } from '../contexts/UserContext';

function PostPage() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Accessing theme and user ID from context
  const { theme } = useContext(ThemeContext);
  const { userId } = useContext(UserContext);

  // Fetch post and comments on component mount or when id changes
  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  async function fetchPost() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setPost(data);
      setEditedTitle(data.title);
      setEditedContent(data.content);
    } catch (error) {
      console.error('Error fetching post:', error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchComments() {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', id)
        .order('created_at', { ascending: true });

      if (error) throw error;

      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error.message);
    }
  }

  async function handleUpvote() {
    try {
      const { data, error } = await supabase
        .from('posts')
        .update({ upvotes: (post.upvotes || 0) + 1 })
        .eq('id', id);

      if (error) throw error;

      setPost({ ...post, upvotes: (post.upvotes || 0) + 1 });
    } catch (error) {
      console.error('Error upvoting:', error.message);
    }
   }

   async function handleAddComment(e) {
     e.preventDefault();
     
     if (!newComment.trim()) return;

     try {
       const { data, error } = await supabase
         .from('comments')
         .insert([{ post_id: id, content: newComment, user_id: userId }])
         .select('*');

       if (error) throw error;

       setComments([...comments, ...data]);
       setNewComment('');
     } catch (error) {
       console.error('Error adding comment:', error.message);
     }
   }

   async function handleDelete() {
     if (secretKey !== post.secret_key) {
       alert('Incorrect secret key');
       return;
     }

     try {
       await supabase.from('comments').delete().eq('post_id', id);
       
       await supabase.from('posts').delete().eq('id', id);

       navigate('/');
     } catch (error) {
       console.error('Error deleting post:', error.message);
     }
   }

   async function handleEdit() {
     if (secretKey !== post.secret_key) {
       alert('Incorrect secret key');
       return;
     }

     try {
       await supabase.from('posts').update({ title: editedTitle, content: editedContent }).eq('id', id);

       setPost({ ...post, title: editedTitle, content: editedContent });
       setIsEditing(false);
       
     } catch (error) {
       console.error('Error updating post:', error.message);
     }
   }

   async function handleRepost() {
     try {
       
       const { postData, error } = await supabase
         .from('posts')
         .select('id')
         .eq(id);

      
       const { data, error } = await supabase.from('posts').insert([
         { 
           title: `Repost: ${postData.title}`, 
           content: postData.content,
           image_url: postData.image_url,
           video_url: postData.video_url,
           user_id: userId,
           original_post_id: postData.id // Ensure this column exists in your schema
         }
       ]);
       console.log("This is my data variable: ", data );
       if (error) throw error;

       navigate(`/post/${data[0].id}`);
       
     } catch (error) {
       console.error('Error reposting:', error.message);
     }
   }

   if (isLoading) return <LoadingSpinner />;
   
   if (!post) return <div>Post not found</div>;

   return (
     <div className={`post-page ${theme}`}>
       {/* Render post content */}
       {/* Editing or viewing mode */}
       {isEditing ? (
         <div>
           <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
           <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
           <input type="password" value={secretKey} onChange={(e) => setSecretKey(e.target.value)} placeholder="Enter secret key to edit" />
           <button onClick={handleEdit}>Save Changes</button>
           <button onClick={() => setIsEditing(false)}>Cancel</button>
         </div>
       ) : (
         <div>
           <h1>{post.title}</h1>
           <p>{post.content}</p>
           {post.image_url && <img src={post.image_url} alt={post.title} />}
           {post.video_url && (
             <iframe width="560" height="315" src={post.video_url} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
           )}
           <p>Upvotes: {post.upvotes || 0}</p>
           <p>Flag: {post.flag}</p>
           <button onClick={handleUpvote}>Upvote</button>
           <button onClick={() => setIsEditing(true)}>Edit Post</button>
           <button onClick={handleDelete}>Delete Post</button>
           <button onClick={handleRepost}>Repost</button>
           <input type="password" value={secretKey} onChange={(e) => setSecretKey(e.target.value)} placeholder="Enter secret key to delete" />
         </div>
       )}

       {/* Comments Section */}
       <h2>Comments</h2>
       <form onSubmit={handleAddComment}>
         <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Add a comment" required />
         <button type="submit">Add Comment</button>
       </form>

       {/* Render comments */}
       {comments.map((comment) => (
         <div key={comment.id} className="comment">
           <p>{comment.content}</p>
           <small>User ID: {comment.user_id}</small>
           <small>{new Date(comment.created_at).toLocaleString()}</small>
         </div>
       ))}
     </div>
   );
}

export default PostPage;
