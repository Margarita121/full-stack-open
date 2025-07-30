import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { showNotificationWithTimeout } from '../reducers/notificationReducer'
import { useField } from '../hooks'

const LoginForm = () => {
  const { onReset: resetUsername, ...username } = useField('text')
  const { onReset: resetPassword, ...password } = useField('text')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      dispatch(
        loginUser({ username: username.value, password: password.value })
      )
      resetUsername()
      resetPassword()
    } catch (exception) {
      console.log(exception)
      dispatch(showNotificationWithTimeout('Wrong credentials', 2))
    }
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
