import { useEffect } from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import userService from './services/users'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import UserList from './components/UserList'
import User from './components/User'
import Menu from './components/Menu'
import { useUserDispatch } from './contexts/UserContext'
import blogService from './services/blogs'

const App = () => {
  const userDispatch = useUserDispatch()
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      userDispatch({type: 'SET', payload: loggedUser})
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const usersResult = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  })

  if ( usersResult.isLoading ) {
    return <div>loading user data...</div>
  }

  if ( usersResult.isError ) {
    return <div>user service not available due to problems in server</div>
  }

  const users = usersResult.data

  // const result = useQuery({
  //   queryKey: ['blogs'],
  //   queryFn: blogService.getAll,
  // })

  // if ( result.isLoading ) {
  //   return <div>loading data...</div>
  // }

  // if ( result.isError ) {
  //   return <div>blog service not available due to problems in server</div>
  // }

  // const blogs = result.data

  // const match = useMatch('/users/:id')
  //   const user = match 
  //   ? users.find(user => user.id === match.params.id)
  //   : null
  
  
  return (
    <div>
      <Notification />
      <Menu />
      <Routes>
        {/* <Route path="/blogs/:id" element={<Blog blogs={blogs} />} /> */}
        <Route path="/blogs" element={<BlogList  />} />
        <Route path="/users/:id" element={<User users={users}/>} />
        <Route path="/users" element={<UserList users={users} />} />
        <Route path="/create" element={<BlogForm/>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </div>
  )
}

export default App
