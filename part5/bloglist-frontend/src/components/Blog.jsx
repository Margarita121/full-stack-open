import { useState } from 'react'


const Blog = ({ blog, updateLikes, user, removeBlog }) => {
  const [blogDetails, setBlogDetails] = useState(false)

  const toggleVisibility = () => {
    setBlogDetails(!blogDetails)
  }

  return (
    <div className="blog">
      <div>
        {blog.title} {blog.author} {''}
        <button onClick={() => toggleVisibility()}>{blogDetails ? 'hide' : 'view'}</button>
      </div>
      {
        blogDetails && (
          <div>
            <a href={blog.url}>{blog.url}</a>
            <div>
            likes {blog.likes} {''}
              <button onClick={() => updateLikes(blog)}>like</button>
            </div>
            <div>{blog.user.name}</div>
            {blog.user.username === user.username && (
              <div>
                <button className="blueButton" onClick={() => removeBlog(blog)}>remove</button>
              </div>
            )}
          </div>
        )}
    </div>
  )


}

export default Blog