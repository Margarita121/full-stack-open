import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Page = styled.div`
  padding: 1em;
  background: papayawhip;
  border-style: solid;
  border-width: 1;
`
const Table = styled.table`
  th,
  td {
    margin: 0.25em;
  }
  margin: 0.1em 0.25em 0.5em;
`
const CenterTd = styled.td`
  text-align: center;
`

const UserList = () => {
  const users = useSelector(({ users }) => {
    return users
  })

  if (!users) {
    return <div>Please login first</div>
  }

  const UserListItem = ({ user }) => {
    return (
      <tr>
        <td>
          <Link to={`/users/${user.id}`}> {user.name} </Link>{' '}
        </td>
        <CenterTd>{user.blogs.length}</CenterTd>
      </tr>
    )
  }

  return (
    <Page>
      <h2>Users</h2>
      <Table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {[...users].map((user) => (
            <UserListItem key={user.id} user={user} />
          ))}
        </tbody>
      </Table>
    </Page>
  )
}

export default UserList
