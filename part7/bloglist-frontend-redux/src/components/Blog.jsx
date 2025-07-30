import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showNotificationWithTimeout } from '../reducers/notificationReducer'
import { removeBlog, updateLikes } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const [blogDetails, setBlogDetails] = useState(false)
  const dispatch = useDispatch()

  const user = useSelector(({ user }) => {
    return user
  })

  const toggleVisibility = () => {
    setBlogDetails(!blogDetails)
  }

  const onClickLike = (blog) => {
    dispatch(updateLikes(blog))
    dispatch(showNotificationWithTimeout(`You liked ${blog.title}`, 2))
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id))
      window.location.reload()
    }
  }

  return (
    <div className="blog" key={blog.id}>
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
              <button className="blueButton" onClick={() => deleteBlog(blog)}>
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
