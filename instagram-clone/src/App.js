import React, { useState } from 'react';
import './App.css';
import Post from './components/Post';

function App() {
    const [ posts, setPosts ] = useState([
        {
            username: 'DakotaJ',
            caption: 'Hi there!!',
            imageUrl: 'https://mtv.mtvnimages.com/uri/mgid:ao:image:mtv.com:56104?quality=0.8&format=jpg'
        },
        {
            username: 'DakotaJ',
            caption: 'Hi there!!',
            imageUrl: 'https://mtv.mtvnimages.com/uri/mgid:ao:image:mtv.com:56104?quality=0.8&format=jpg'
        }
    ]);
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
                posts.map((post) => <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} />)}
        </div>
    );
}

export default App;
