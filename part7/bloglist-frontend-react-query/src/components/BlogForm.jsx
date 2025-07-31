import { useField } from '../hooks'
import { useNotificationDispatch } from '../contexts/NotificationContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'

const BlogForm = ({ blogFormRef }) => {
  const { onReset: resetTitle, ...title } = useField('text')
  const { onReset: resetAuthor, ...author } = useField('text')
  const { onReset: resetUrl, ...url } = useField('text')
  const notificationDispatch = useNotificationDispatch()
  const queryClient =  useQueryClient() 

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
    },
  })

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
        title: title.value,
        author: author.value,
        url: url.value,
        votes: 0
      }

    newBlogMutation.mutate(newBlog)

    notificationDispatch({type:'SET', payload:`You added ${title.value}`})
      setTimeout(() => {
        notificationDispatch({type:'REMOVE'})
      }, 5000)

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
