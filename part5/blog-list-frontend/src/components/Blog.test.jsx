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

  test('renders blog title', () => {
    screen.getByText('React patterns')
  })

  test('renders blog author', () => {
    screen.getByText('Hange Zoë')
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
})
