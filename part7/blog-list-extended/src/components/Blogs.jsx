import Blog from './Blog'
import { useDispatch } from 'react-redux'
import { increaseLikes, deleteBlog } from '../reducers/blogReducer'

const Blogs = ({ user, blogs }) => {
  const dispatch = useDispatch()
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const updateLikes = async (blogToUpdate) => {
    dispatch(increaseLikes(blogToUpdate))
  }

  const removeBlog = async (blogToDelete) => {
    if (
      window.confirm(
        `Remove blog ${blogToDelete.title} by ${blogToDelete.author} ?`,
      )
    ) {
      dispatch(deleteBlog(blogToDelete, user))
    }
  }

  return (
    <>
      <h2>Blogs</h2>
      <ul>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateHandler={updateLikes}
            username={user.username}
            deleteHandler={removeBlog}
          />
        ))}
      </ul>
    </>
  )
}
export default Blogs
