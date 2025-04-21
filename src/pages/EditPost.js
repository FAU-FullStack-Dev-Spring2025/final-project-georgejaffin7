import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import './EditPost.css'
import { supabase } from '../client'

const EditPost = ({data}) => {
    const {id} = useParams();
    const [post, setPost] = useState({
        id: null, 
        title: "", 
        description: "",
        image_url: ""
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost((prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const updatePost = async (event) => {
        event.preventDefault();
      
        await supabase
          .from('MusicCommunity')
          .update({ 
            title: post.title, 
            description: post.description,
            image_url: post.image_url
          })
          .eq('id', id);
      
        window.location = "/";
    }

    const deletePost = async (event) => {
        event.preventDefault();
      
        await supabase
          .from('MusicCommunity')
          .delete()
          .eq('id', id); 
      
        window.location = "/";
    }

    return (
        <div>
            <form>
                <label htmlFor="title">Title</label><br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="description">Description</label><br />
                <textarea 
                    rows="5" 
                    cols="50" 
                    id="description" 
                    name="description" 
                    value={post.description} 
                    onChange={handleChange}
                ></textarea>
                <br/><br/>

                <label htmlFor="image_url">Image URL</label><br />
                <input 
                    type="url" 
                    id="image_url" 
                    name="image_url"
                    value={post.image_url}
                    placeholder="https://example.com/image.jpg"
                    onChange={handleChange}
                /><br /><br />

                <input type="submit" value="Submit" onClick={updatePost}/>
                <button className="deleteButton" onClick={deletePost}>Delete</button>
            </form>
        </div>
    )
}

export default EditPost