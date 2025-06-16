import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (user){
      blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
      event.preventDefault()
      
      try {
        const user = await loginService.login({
          username, password,
        })
        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
        ) 
        blogService.setToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')
      } catch (exception) {
        setErrorMessage('Wrong credentials')
        console.log(exception)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }

    const handleLogout = async () => {
      window.localStorage.removeItem('loggedBlogappUser')
      window.location.reload()
    }

  return (
    <div>
      <Notification message={errorMessage} />
      { user === null ?
      <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} /> :
      <div>
        <h2>blogs</h2>
        <p>
          {user.name} logged-in <button onClick={handleLogout}>logout</button>
        </p> 
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
        )}
      </div>
    }
    </div>
  )
}

export default App