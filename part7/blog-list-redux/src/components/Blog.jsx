import { useState } from 'react'
import { increaseLikes, addComment } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, username, deleteHandler }) => {
  const [comment, setComment] = useState('')

  const handleCommentChange = (e) => {
    setComment(e.target.value)
  }
  const dispatch = useDispatch()
  const updateLikes = async (blogToUpdate) => {
    dispatch(increaseLikes(blogToUpdate))
  }
  const postComment = async (e) => {
    e.preventDefault()
    try {
      dispatch(addComment(blog.id, comment))
      e.target.comment.value = ''
    } catch (err) {
      console.log(err)
    }
  }
  if (!blog) {
    return null
  }

  const deleteButtonVisible = {
    display: username === blog.user.username ? 'flex' : 'none',
    width: 'fit-content',
    color: '#ff2c2c',
    border: '2px solid #ff2c2c',
  }

  return (
    <div className="blog">
      <div>
        <h2>
          {blog.title} by
          <b>
            <i> {blog.author}</i>
          </b>
        </h2>
      </div>
      <a href={blog.url}>{blog.url}</a>
      <p>
        <b> likes </b> {blog.likes}
        <button onClick={() => updateLikes(blog)}> like </button>
      </p>
      <p> added by {blog.user.name}</p>
      <h3> comments</h3>
      <ul>
        {blog.comments.length !== 0 ? (
          blog.comments.map((c, i) => <li key={i}> {c} </li>)
        ) : (
          <p> no comments yet</p>
        )}
      </ul>
      <div>
        <form onSubmit={postComment}>
          <label>
            <input
              name="comment"
              value={comment}
              placeholder="add comment"
              onChange={handleCommentChange}
            />
          </label>
          <button type="submit">add comment</button>
        </form>
      </div>
      <button style={deleteButtonVisible} onClick={() => deleteHandler(blog)}>
        <b>remove </b>
      </button>
    </div>
  )
}
export default Blog
