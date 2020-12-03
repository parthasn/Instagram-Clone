import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './components/Post';
import { db } from './firebase';

function App() {
    const [ posts, setPosts ] = useState([]);

    useEffect(() => {
        db.collection('posts').onSnapshot((snapshot) => {
            // every time a new post is added, this code is fired
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data()
            })));
        });
    }, []);

    return (
        <div className="app">
            <div className="app_header">
                <img
                    className="app_headerImage"
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                    alt=""
                />
            </div>
            {posts &&
                posts.map(({id, post}) => <Post key = {id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />)}
        </div>
    );
}

export default App;
