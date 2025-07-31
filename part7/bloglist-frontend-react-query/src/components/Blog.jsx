import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../contexts/NotificationContext'
import { useUserValue } from '../contexts/UserContext'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [blogDetails, setBlogDetails] = useState(false)
  const notificationDispatch = useNotificationDispatch()

  const user = useUserValue()

  const toggleVisibility = () => {
    setBlogDetails(!blogDetails)
  }

  const queryClient =  useQueryClient() 
  const likeBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const onClickLike = (blog) => {
    const changedLikes = blog.likes + 1
    const updatedBlog = {...blog, likes: changedLikes}
    likeBlogMutation.mutate(updatedBlog)    

    notificationDispatch({type:'SET', payload:`You liked ${blog.title}`})
      setTimeout(() => {
        notificationDispatch({type:'REMOVE'})
      }, 5000)
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog.id)
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
