import Blog from './Blog'
import { useDispatch } from 'react-redux'
import { increaseLikes } from '../reducers/blogReducer'

const Blogs = ({ username, name, logoutHandler, blogs, deleteHandler }) => {
  const dispatch = useDispatch()
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const updateLikes = async (blogToUpdate) => {
    dispatch(increaseLikes(blogToUpdate))
  }

  return (
    <>
      <h4>
        {name} logged in
        <button onClick={() => logoutHandler()}> logout </button>
      </h4>
      <h2>Blogs</h2>
      <ul>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateHandler={updateLikes}
            username={username}
            deleteHandler={deleteHandler}
          />
        ))}
      </ul>
    </>
  )
}
export default Blogs
