import { useState } from 'react'

/* eslint-disable react/prop-types */
const Blog = ({ blog, updateBlog }) => {
  const [blogDetailsVisible, setBlogDetailsVisible] = useState(false)

  const hideWhenVisible = { display: blogDetailsVisible ? 'none' : '' }
  const showWhenVisible = { display: blogDetailsVisible ? '' : 'none' }

  const updateLikes = (event) => {
      event.preventDefault()
      updateBlog(blog.id, 
        {
            user: blog.user,
            likes: blog.likes + 1,
            title: blog.title,
            author: blog.author,
            url: blog.url
          })
        }
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
          <button onClick={updateLikes}>like</button> <br/>
          {blog.user.name}
        </div>
      </div>  
  )
  
}
  export default Blog