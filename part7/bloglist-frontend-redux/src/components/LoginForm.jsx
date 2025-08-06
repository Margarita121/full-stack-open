import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../reducers/loginReducer'
import { showNotificationWithTimeout } from '../reducers/notificationReducer'
import { useField } from '../hooks'
import styled from 'styled-components'

const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`
const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 0.5em 0.25em 0.5em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const LoginForm = () => {
  const { onReset: resetUsername, ...username } = useField('text')
  const { onReset: resetPassword, ...password } = useField('text')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      dispatch(
        setCurrentUser({ username: username.value, password: password.value })
      )
      resetUsername()
      resetPassword()
    } catch (exception) {
      console.log(exception)
      dispatch(showNotificationWithTimeout('Wrong credentials', 2))
    }
  }

  return (
    <Page>
      <form onSubmit={handleLogin}>
        <h2>Log in to application</h2>
        <table>
          <tbody>
            <tr>
              <td>Username:</td>
              <td>
                <input data-testid="username" name="Username" {...username} />
              </td>
            </tr>
            <tr>
              <td>Password:</td>
              <td>
                <input data-testid="password" name="Password" {...password} />
              </td>
            </tr>
          </tbody>
        </table>
        <Button type="submit">Login</Button>
      </form>
    </Page>
  )
}

export default LoginForm
