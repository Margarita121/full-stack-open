import { useEffect } from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import Menu from './components/Menu'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import UserList from './components/UserList'
import User from './components/User'
import { initializeBlogs } from './reducers/blogReducer'
import { logIn, logOut } from './reducers/loginReducer'
import { initializeUsers } from './reducers/usersReducer'
import localStorageService from './services/localStorage'
import blogService from './services/blogs'

const App = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.login)

  useEffect(() => {
    if (loggedUser) {
      dispatch(initializeBlogs())
      dispatch(initializeUsers())
    }
  }, [loggedUser, dispatch])

  useEffect(() => {
    const user = localStorageService.loadUser()
    if (user) {
      blogService.setToken(user.token)
      dispatch(logIn(user))
    }
  }, [])

  // const handleLogout = async () => {
  //   dispatch(logOut())
  // }

  const users = useSelector(({ users }) => {
    return users
  })
  const userMatch = useMatch('/users/:id')
  const user = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null

  const blogs = useSelector(({ blogs }) => {
    return blogs
  })
  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  if (!loggedUser) {
    return <LoginForm />
  }

  return (
    <div>
      <Notification />
      <Menu />
      <Routes>
        <Route path="/blogs/:id" element={<Blog blog={blog} />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/users/:id" element={<User user={user} />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/create" element={<BlogForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </div>
  )
}

export default App
