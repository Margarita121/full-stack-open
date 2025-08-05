import { useRef } from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'
import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useUserValue } from '../contexts/UserContext'

const BlogList = () => {
  const blogFormRef = useRef()
  const loggedInUser = useUserValue()
  if (!loggedInUser) {
    return <div>Please login first</div>
  }

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>blog service not available due to problems in server</div>
  }

  const blogs = result.data

  const blogForm = () => {
    return (
      <div>
        <div>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef} />
          </Togglable>
        </div>
      </div>
    )
  }

  const BlogListItem = ({blog}) => {
    return (
        <div>
          {/* <Link to={`/blogs/${blog.id}`}> {blog.title} {blog.author}  </Link> */}
          {blog.title} {blog.author}
        </div>  
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {blogForm()}
      {[...blogs]
        .sort((secondItem, firstItem) => firstItem.likes - secondItem.likes)
        .map((blog) => (
          <BlogListItem key={blog.id} blog={blog}/> 
        ))}
    </div>
  )
}

export default BlogList
