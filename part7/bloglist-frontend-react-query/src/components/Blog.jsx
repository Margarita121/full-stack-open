// import { useState } from 'react'
// import { useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../contexts/NotificationContext'
import { useUserValue } from '../contexts/UserContext'
import blogService from '../services/blogs'

const Blog = ({ blogs }) => {
  // const [blogDetails, setBlogDetails] = useState(false)
  const notificationDispatch = useNotificationDispatch()

  const user = useUserValue()
  const id = useParams().id
  const blog = blogs.find(blog =>
     blog.id === id,
    )
  if (!blogs) {
    console.log('no blogs')
    return null
  }

  // const toggleVisibility = () => {
  //   setBlogDetails(!blogDetails)
  // }

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
    <div className="blog">

          <h1>{blog.title} {blog.author}</h1>
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
  )
}

export default Blog
