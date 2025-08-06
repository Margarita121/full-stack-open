import { useDispatch, useSelector } from 'react-redux'
import { showNotificationWithTimeout } from '../reducers/notificationReducer'
import { removeBlog, updateLikes, addNewComment } from '../reducers/blogReducer'
import styled from 'styled-components'

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 0.5em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`
const SmallButton = styled(Button)`
  font-size: 0.8em;
  margin: 0.1em 0.25em 0.1em;
  padding: 0.25em 1em;
`
const RemoveButton = styled(SmallButton)`
  margin: 1em 0.25em 0.25em;
`
const Input = styled.input`
  margin: 0.25em;
`
const Page = styled.div`
  padding: 1em;
  background: papayawhip;
  border-style: solid;
  border-width: 1;
`

const CustomLink = styled.a`
  padding: 0.1em 0.25em;
  margin: 0.25em;
  border: 1px solid Chocolate;
  background: lightcyan;
`
const Table = styled.table`
  th,
  td {
    margin: 0.25em;
  }
  margin: 0.1em 0.25em 0.5em;
`

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
    <Page key={blog.id}>
      <Table>
        <tbody>
          <tr>
            <td>Title:</td>
            <td>{blog.title}</td>
          </tr>
          <tr>
            <td>Author:</td>
            <td>{blog.author}</td>
          </tr>
          <tr>
            <td>Likes:</td>
            <td>{blog.likes}</td>
            <td>
              <SmallButton onClick={() => onClickLike(blog)}>like</SmallButton>
            </td>
          </tr>
          <tr>
            <td>Added by:</td>
            <td>{blog.user.name}</td>
          </tr>
        </tbody>
      </Table>
      <div>
        <CustomLink href={blog.url}>{blog.url}</CustomLink>
        {blog.user.username === loggedUser.username && (
          <div>
            <RemoveButton onClick={() => deleteBlog(blog)}>
              remove blog
            </RemoveButton>
          </div>
        )}
        <h3>comments</h3>
        <form onSubmit={addComment}>
          <Input name="comment" />
          <Button type="submit">add comment</Button>
        </form>
        <div>
          <ul>
            {blog.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        </div>
      </div>
    </Page>
  )
}

export default Blog
