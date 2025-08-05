import { Link } from 'react-router-dom'
import { useUserValue } from '../contexts/UserContext'
const Menu = () => {
  const loggedInUser = useUserValue()
  const padding = {
    paddingRight: 5
  }

  const LoggedIn = () => {
    const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
    }
    return (
      <div>
        <p>
        {loggedInUser.name} logged-in <button onClick={handleLogout}>logout</button>
      </p>
        <div>
          <Link style={padding} to="/blogs">blogs</Link>
          <Link style={padding} to="/users">users</Link>
          <Link style={padding} to="/create">create new</Link>
        </div> 
      </div>
    )
  }
  
  return (
    <div>
      { !loggedInUser
        ? <Link style={padding} to="/login">login</Link>
        : <LoggedIn /> 
      }
    </div>
  )
}

export default Menu