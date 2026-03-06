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
    <form onSubmit={addBlog} className="flex flex-col gap-2">
      <h2 className="font-bold text-2xl text-blue-300"> add new blog </h2>
      <div className="flex flex-row gap-4">
        <label className="text-lg w-16" htmlFor="title">
          title
        </label>
        <input name="title" className="bg-input rounded-md" id="title" />
      </div>
      <div className="flex flex-row gap-4">
        <label className="text-lg w-16" htmlFor="author">
          author
        </label>
        <input
          name="author"
          className="bg-input rounded-md flex-1"
          id="author"
        />
      </div>
      <div className="flex flex-row gap-4">
        <label className="text-lg w-16" htmlFor="url">
          url
        </label>
        <input name="url" className="bg-input rounded-md" id="url" />
      </div>
      <div className="flex flex-row gap-4">
        <label className="text-lg w-16" htmlFor="likes">
          likes
        </label>
        <input name="likes" className="bg-input rounded-md" id="likes" />
      </div>
      <div>
        <button type="submit" className="w-full">
          add
        </button>
      </div>
    </form>
  )
}
export default BlogForm
