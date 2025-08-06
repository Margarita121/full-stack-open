import styled from 'styled-components'

const Page = styled.div`
  padding: 1em;
  background: papayawhip;
  border-style: solid;
  border-width: 1;
`

const User = ({ user }) => {
  if (!user) {
    console.log('no user')
    return null
  }

  return (
    <Page>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </Page>
  )
}

export default User
