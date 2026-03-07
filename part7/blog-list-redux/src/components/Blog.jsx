import { useState } from 'react'
import { increaseLikes, addComment } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import {
  BsBookmarkFill,
  BsHandThumbsUp,
  BsTrash3,
  BsChatHeartFill,
  BsSend,
  BsPersonHeart,
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
      setComment('')
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
  const comments = blog.comments.filter((c) => c !== null)

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
      <p className="text-lg font-bold">
        check it out at &ensp;
        <a href={blog.url} className="font-bold text-lg">
          {blog.url}
        </a>
      </p>
      <div className="flex gap-4 items-center">
        <p className="text-lg font-bold">{blog.likes} likes</p>
        <button
          onClick={() => updateLikes(blog)}
          className="flex flex-row gap-2 items-center"
        >
          <BsHandThumbsUp />
          like
        </button>
      </div>

      <span>
        added by
        <p className="text-lg font-bold text-blue-300">{blog.user.name} </p>
      </span>
      <div className="flex gap-4 items-center">
        <BsChatHeartFill className="font-bold text-2xl" />
        <h3 className="font-bold text-2xl"> comments</h3>
      </div>
      <ul>
        {comments.length !== 0 ? (
          comments.map((c, i) => (
            <li key={i} className="flex gap-4 items-center">
              <BsPersonHeart /> {c}
            </li>
          ))
        ) : (
          <p className="text-lg font-bold text-blue-300"> no comments yet</p>
        )}
      </ul>
      <div>
        <form onSubmit={postComment} className="flex flex-col gap-2">
          <textarea
            name="comment"
            value={comment}
            onChange={handleCommentChange}
            rows={1}
            className="resize-none w-100"
            onInput={(e) => {
              e.target.style.height = 'auto'
              e.target.style.height = e.target.scrollHeight + 'px'
            }}
          />
          <button
            type="submit"
            className="flex flex-row gap-2 items-center w-fit"
          >
            <BsSend /> add comment
          </button>
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
