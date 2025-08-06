import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import styled from 'styled-components'

const Page = styled.div`
  padding: 1em;
  background: papayawhip;
  border-style: solid;
  border-width: 1;
`

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
          {blog.title} {blog.author}
        </Link>
      </div>
    )
  }

  return (
    <Page>
      <h2>Blogs</h2>
      {blogForm()}
      {[...blogs]
        .sort((secondItem, firstItem) => firstItem.likes - secondItem.likes)
        .map((blog) => (
          <BlogListItem key={blog.id} blog={blog} />
        ))}
    </Page>
  )
}

export default BlogList
