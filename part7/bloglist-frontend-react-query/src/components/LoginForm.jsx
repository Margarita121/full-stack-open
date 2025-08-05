import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'
import { useUserDispatch } from '../contexts/UserContext'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = () => {
  const { onReset: resetUsername, ...username } = useField('text')
  const { onReset: resetPassword, ...password } = useField('text')

  const userDispatch = useUserDispatch()
  const navigate = useNavigate()
  
  const handleLogin = async (event) => {
    event.preventDefault()
    const loginResponse = await loginService.login({ username: username.value, password: password.value })
    userDispatch({type: 'SET', payload: loginResponse})
    blogService.setToken(loginResponse.token)
    window.localStorage.setItem(
      'loggedBlogappUser',
      JSON.stringify(loginResponse)
    )
    resetUsername()
    resetPassword()
    navigate('/blogs')
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        username
        <input data-testid="username" name="Username" {...username} />
      </div>
      <div>
        password
        <input data-testid="password" name="Password" {...password} />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
