import React from 'react'
import Avatar from "@mui/material/Avatar"

function Post({username, caption, imageURL}) {
  return (
    <div className='post'>
      <div className="post_header">
        <Avatar className='post_avatar'>A</Avatar>
        <h3>{username}</h3>
      </div>

      <img className='post_image' src={imageURL} alt="" />
      <h4><strong>{username}: </strong>{caption}</h4>
    </div>
  )
}

export default Post