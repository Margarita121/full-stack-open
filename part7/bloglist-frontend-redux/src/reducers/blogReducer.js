import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const { appendBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}
export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const removeBlog = (blogId) => {
  return async (dispatch) => {
    await blogService.remove(blogId)
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const updateLikes = (blog) => {
  return async (dispatch) => {
    const changedLikes = blog.likes + 1
    const changedBlog = {
      ...blog,
      likes: changedLikes,
    }

    await blogService.update(blog.id, changedBlog)
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addNewComment = (id, comment) => {
  return async (dispatch) => {
    const newComment = {
      comment: comment,
    }
    await blogService.addComment(id, newComment)
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export default blogSlice.reducer
