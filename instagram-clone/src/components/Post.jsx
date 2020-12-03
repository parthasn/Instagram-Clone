import React from 'react'
import './module.post.css'
import Avatar from '@material-ui/core/Avatar'

function Post({username, caption, imageUrl}) {
    return (
        <div className = "post">
            <div className="post_header">
            <Avatar
                className = "post_avatar"
                alt = "DakotaJ"
                src = "/static/images/avatar/1.jpg"
            />
            <h3>{username}</h3>
            </div>
            
            <img className = "post_image" src = {imageUrl}
                alt = ""/>
            <p className = "post_text"><strong>{username}:</strong> {caption}</p>
        </div>
    )
}

export default Post
