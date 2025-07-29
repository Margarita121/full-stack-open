import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> calls event handler with the right details onSubmit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')
  const sendButton = screen.getByText('create')

  const testBlog = {
    title: 'testing blog title',
    author: 'name surname',
    url: 'www.test-url.com',
  }

  await user.type(titleInput, testBlog.title)
  await user.type(authorInput, testBlog.author)
  await user.type(urlInput, testBlog.url)
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toStrictEqual(testBlog)
  // console.log(createBlog.mock.calls)
})
