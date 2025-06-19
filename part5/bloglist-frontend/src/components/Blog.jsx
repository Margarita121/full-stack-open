import { useState } from 'react'

/* eslint-disable react/prop-types */
const Blog = ({ blog }) => {
  const [blogDetailsVisible, setBlogDetailsVisible] = useState(false)

  const hideWhenVisible = { display: blogDetailsVisible ? 'none' : '' }
  const showWhenVisible = { display: blogDetailsVisible ? '' : 'none' }
  return (
    <div className="blog">
        <div style={hideWhenVisible}>
          {blog.title} {blog.author} 
          
          <button onClick={() => setBlogDetailsVisible(true)}>view</button>
        </div>
        <div style={showWhenVisible}>
          {blog.title} {blog.author}  
          <button onClick={() => setBlogDetailsVisible(false)}>hide</button> <br/>
          {blog.url} <br/>
          likes {blog.likes} 
          <button>like</button> <br/>
          {blog.user.name}
        </div>
      </div>  
  )
  
}
  export default Blog