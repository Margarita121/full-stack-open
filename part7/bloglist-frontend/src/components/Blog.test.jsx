import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const user = {
    name: 'testuser',
    username: 'testusername',
  }

  const blog = {
    title: 'blog title',
    author: 'name surname',
    url: 'www.test.com',
    likes: 1,
    user: {
      name: 'testuser',
      username: 'testusername',
    },
  }

  test('by default shows title and author but not url and likes', () => {
    render(<Blog blog={blog} user={user} />)
    //   screen.debug()
    const title = screen.getByText(blog.title, { exact: false })
    expect(title).toBeDefined()
    const author = screen.getByText(blog.author, { exact: false })
    expect(author).toBeDefined()
    const url = screen.queryByText(blog.url)
    expect(url).toBeNull()
    const likes = screen.queryByText(blog.likes)
    expect(likes).toBeNull()
  })

  test('url and likes are shown after clicking view details', async () => {
    render(<Blog blog={blog} user={user} />)
    const userEv = userEvent.setup()
    const viewBtn = screen.getByText('view')
    await userEv.click(viewBtn)
    // screen.debug()
    const url = screen.getByText(blog.url)
    expect(url).toBeDefined()
    const likes = screen.getByText(`likes ${blog.likes}`)
    expect(likes).toBeDefined()
  })

  test('clicking the like button twice calls event handler twice', async () => {
    const mockHandler = vi.fn()
    render(<Blog blog={blog} user={user} updateLikes={mockHandler} />)

    const userEv = userEvent.setup()
    const viewBtn = screen.getByText('view')
    await userEv.click(viewBtn)
    const likeBtn = screen.getByText('like')
    await userEv.click(likeBtn)
    expect(mockHandler.mock.calls).toHaveLength(1)
    await userEv.click(likeBtn)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
