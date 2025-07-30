import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { showNotificationWithTimeout } from '../reducers/notificationReducer'
import { useField } from '../hooks'

const BlogForm = ({ blogFormRef }) => {
  const { onReset: resetTitle, ...title } = useField('text')
  const { onReset: resetAuthor, ...author } = useField('text')
  const { onReset: resetUrl, ...url } = useField('text')
  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    dispatch(
      createBlog({
        title: title.value,
        author: author.value,
        url: url.value,
      })
    )

    dispatch(showNotificationWithTimeout(`You added ${title.value}`, 2))

    resetTitle()
    resetAuthor()
    resetUrl()

    blogFormRef.current.toggleVisibility()
  }

  return (
    <form onSubmit={addBlog}>
      <h2>create new</h2>
      <div>
        title:
        <input name="Title" placeholder="title" {...title} />
      </div>
      <div>
        author:
        <input name="Author" placeholder="author" {...author} />
      </div>
      <div>
        url:
        <input name="Url" placeholder="url" {...url} />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
