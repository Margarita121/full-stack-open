import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'

const BlogList = () => {
  const blogFormRef = useRef()

  const blogs = useSelector(({ blogs }) => {
    return blogs
  })

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

  const BlogListItem = ({ blog }) => {
    return (
      <div>
        <Link to={`/blogs/${blog.id}`}>
          {' '}
          {blog.title} {blog.author}{' '}
        </Link>
        {/* {blog.title} {blog.author} */}
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
          // <Blog key={blog.id} blog={blog} />
          <BlogListItem key={blog.id} blog={blog} />
        ))}
    </div>
  )
}

export default BlogList
