import { Link } from 'react-router-dom'
import { useUserValue } from '../contexts/UserContext'

const UserList = ({users}) => {

  const loggedInUser = useUserValue()
  if (!loggedInUser) {
    return <div>Please login first</div>
  }
  
  const UserListItem = ({user}) => {
    return (
        <tr>
          <td><Link to={`/users/${user.id}`}> {user.name} </Link> </td>
          <td>{user.blogs.length}</td>
        </tr>
    )
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        {[...users]
        .map((user) => (
          <UserListItem key={user.id} user={user}/>
        ))}
      </tbody>
       </table>
    </div>
  )
}

export default UserList
