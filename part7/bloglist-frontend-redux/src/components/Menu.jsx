import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../reducers/loginReducer'
import styled from 'styled-components'

const CustomMenu = styled.div`
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  li {
    display: inline;
    margin: 0.25em;
  }
  padding: 1em;
  background: peachpuff;
`
const Button = styled.button`
  background: Bisque;
  font-size: 0.8em;
  margin: 0.2em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Menu = () => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector((state) => state.login)
  const padding = {
    paddingRight: 5,
  }

  const LoggedIn = () => {
    const handleLogout = async () => {
      dispatch(logOut())
    }
    return (
      <CustomMenu>
        <ul>
          <li>
            <Link style={padding} to="/blogs">
              {' '}
              blogs
            </Link>
          </li>
          <li>
            <Link style={padding} to="/users">
              users
            </Link>
          </li>
          <li>
            {loggedInUser.name} logged-in{' '}
            <Button onClick={handleLogout}>logout</Button>
          </li>
        </ul>
        {/* <Link style={padding} to="/blogs"> blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {loggedInUser.name} logged-in{' '}
        <Button onClick={handleLogout}>logout</Button> */}
      </CustomMenu>
    )
  }

  return (
    <div>
      {!loggedInUser ? (
        <Link style={padding} to="/login">
          login
        </Link>
      ) : (
        <LoggedIn />
      )}
    </div>
  )
}

export default Menu
