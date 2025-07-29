import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { showNotificationWithTimeout } from '../reducers/notificationReducer'

const Blog = ({ blog, updateLikes, user, removeBlog }) => {
  const [blogDetails, setBlogDetails] = useState(false)
  const dispatch = useDispatch()

  const toggleVisibility = () => {
    setBlogDetails(!blogDetails)
  }

  const onClickLike = (blog) => {
    updateLikes(blog)
    dispatch(showNotificationWithTimeout(`You liked ${blog.title}`, 2))
  }  

  return (
    <div className="blog">
      <div>
        {blog.title} {blog.author} {''}
        <button onClick={() => toggleVisibility()}>
          {blogDetails ? 'hide' : 'view'}
        </button>
      </div>
      {blogDetails && (
        <div>
          <a href={blog.url}>{blog.url}</a>
          <div>
            likes {blog.likes} {''}
            <button onClick={() => onClickLike(blog)}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {blog.user.username === user.username && (
            <div>
              <button className="blueButton" onClick={() => removeBlog(blog)}>
                remove
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
