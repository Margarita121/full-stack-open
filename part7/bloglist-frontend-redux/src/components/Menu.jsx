import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../reducers/loginReducer'

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
      <div>
        <Link style={padding} to="/blogs">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        {loggedInUser.name} logged-in{' '}
        <button onClick={handleLogout}>logout</button>
      </div>
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
