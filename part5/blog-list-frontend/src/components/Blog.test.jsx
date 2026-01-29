import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const updateHandler = vi.fn()
const deleteHandler = vi.fn()
const blog = {
  title: 'React patterns',
  author: 'Hange Zoë',
  url: 'https://titansrwonderful.com/',
  likes: 7,
  user: {
    username: 'panther',
    name: 'Black Cat',
    id: '696b2374752a9f647eef1a0f'
  },
  id: '696b3c59e088ed4c95e5f35f'
}

describe('<Blog />', () => {
  beforeEach(() => {
    render(
      <Blog blog={blog} username="Meow" updateHandler={updateHandler} deleteHandler={deleteHandler}/>
    )
  })

  test('renders blog title and author', () => {
    screen.getByText(blog.title)
    screen.getByText(blog.author)
  })

  test('before clicking the button, url and likes are not displayed', () => {
    const url = screen.queryByText(blog.url)
    expect(url).not.toBeVisible()

    const likes = screen.queryByText('7')
    expect(likes).not.toBeVisible()
  })

  test('after clicking the button, url and likes are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const url = screen.getByText('https://titansrwonderful.com/')
    expect(url).toBeVisible()

    const likes = screen.getByText('7')
    expect(likes).toBeVisible()
  })

  test('clicking like button twice calls the updateHandler twice', async () => {
    const user = userEvent.setup()
    const showButton = screen.getByText('show')
    await user.click(showButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(updateHandler.mock.calls).toHaveLength(2)
  })
})
