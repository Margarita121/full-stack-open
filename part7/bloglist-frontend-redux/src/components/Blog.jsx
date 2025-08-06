import { useDispatch, useSelector } from 'react-redux'
import { showNotificationWithTimeout } from '../reducers/notificationReducer'
import { removeBlog, updateLikes, addNewComment } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.login)

  if (!blog) {
    console.log('no blog')
    return null
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

  const addComment = async (event) => {
    event.preventDefault()
    const content = event.target.comment.value
    dispatch(addNewComment(blog.id, content))
    event.target.comment.value = ''
  }

  return (
    <div className="blog" key={blog.id}>
      {blog.title} {blog.author} {''}
      <div>
        <a href={blog.url}>{blog.url}</a>
        <div>
          likes {blog.likes} {''}
          <button onClick={() => onClickLike(blog)}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {blog.user.username === loggedUser.username && (
          <div>
            <button className="blueButton" onClick={() => deleteBlog(blog)}>
              remove
            </button>
          </div>
        )}
        <h3>comments</h3>
        <form onSubmit={addComment}>
          <input name="comment" />
          <button type="submit">add comment</button>
        </form>
        <div>
          <ul>
            {blog.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Blog
