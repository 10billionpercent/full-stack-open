import { useState } from 'react'
import { increaseLikes, addComment } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import {
  BsBookmarkFill,
  BsHandThumbsUp,
  BsTrash3,
  BsChatHeartFill,
} from 'react-icons/bs'

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
    <div className="flex  flex-col gap-4 px-4">
      <div className="flex gap-4 items-center">
        <BsBookmarkFill className="text-3xl text-blue-300" />
        <h3 className="font-bold text-3xl text-blue-300">
          {blog.title} by
          <b>
            <i> {blog.author}</i>
          </b>
        </h3>
      </div>
      <a href={blog.url} className="font-bold text-lg">
        {blog.url}
      </a>
      <p>
        <b> likes </b> {blog.likes}
        <button
          onClick={() => updateLikes(blog)}
          className="flex flex-row gap-2 items-center"
        >
          <BsHandThumbsUp />
          like
        </button>
      </p>
      <p> added by {blog.user.name}</p>
      <div className="flex gap-4 items-center">
        <BsChatHeartFill className="font-bold text-2xl" />
        <h3 className="font-bold text-2xl"> comments</h3>
      </div>
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
      <button
        style={deleteButtonVisible}
        onClick={() => deleteHandler(blog)}
        className="flex flex-row gap-2 items-center"
      >
        <BsTrash3 className="font-bold" />
        <b>remove </b>
      </button>
    </div>
  )
}
export default Blog
