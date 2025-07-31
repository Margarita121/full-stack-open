import { useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import { useUserDispatch, useUserValue } from './contexts/UserContext'
import blogService from './services/blogs'

const App = () => {
  const user = useUserValue()

  const userDispatch = useUserDispatch()
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({type: 'SET', payload: user})
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <Notification />
      {user === null ? <LoginForm /> : <BlogList />}
    </div>
  )
}

export default App
