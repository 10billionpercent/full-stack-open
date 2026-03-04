import { useDispatch } from 'react-redux'
import { appendBlog } from '../reducers/blogReducer'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'

const BlogForm = ({ user }) => {
  const dispatch = useDispatch()

  const addBlog = async (e) => {
    e.preventDefault()
    const title = e.target.title.value
    const author = e.target.author.value
    const url = e.target.url.value
    const likes = e.target.likes.value
    if (title === '' || author === '' || url === '') {
      alert('enter all details')
      return
    }
    e.target.title.value = ''
    e.target.author.value = ''
    e.target.url.value = ''
    e.target.likes.value = ''

    const blogToAdd = { title: title, author: author, url: url, likes: likes }
    try {
      await dispatch(appendBlog(blogToAdd, user))
      dispatch(
        setNotificationWithTimeout(`Added ${title} by ${author}`, 'success'),
      )
    } catch (err) {
      dispatch(setNotificationWithTimeout(err.response.data.error, 'error'))
    }
  }

  return (
    <form onSubmit={addBlog}>
      <h2> add new blog </h2>
      <div>
        <label>
          title
          <input name="title" />
        </label>
      </div>
      <div>
        <label>
          author
          <input name="author" />
        </label>
      </div>
      <div>
        <label>
          url
          <input name="url" />
        </label>
      </div>
      <div>
        <label>
          likes
          <input name="likes" />
        </label>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
export default BlogForm
