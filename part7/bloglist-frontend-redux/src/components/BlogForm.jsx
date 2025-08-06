import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { showNotificationWithTimeout } from '../reducers/notificationReducer'
import { useField } from '../hooks'
import styled from 'styled-components'

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 0.5em 0.25em 0.5em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

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
      <table>
        <tbody>
          <tr>
            <td>Title:</td>
            <td>
              <input name="Title" placeholder="title" {...title} />
            </td>
          </tr>
          <tr>
            <td>Author:</td>
            <td>
              <input name="Author" placeholder="author" {...author} />
            </td>
          </tr>
          <tr>
            <td>Url:</td>
            <td>
              <input name="Url" placeholder="url" {...url} />
            </td>
          </tr>
        </tbody>
      </table>
      <Button type="submit">create</Button>
    </form>
  )
}

export default BlogForm
