import { useState } from 'react'

const Blog = ({ blog, updateHandler, username, deleteHandler }) => {
  const [visible, setVisible] = useState(false)
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
        <h2> {blog.title} </h2>
        <p>
          by
          <b>
            <i> {blog.author}</i>
          </b>
        </p>
      </div>
      <p>
        <b> url </b> {blog.url}
      </p>
      <p>
        <b> likes </b> {blog.likes}
        <button onClick={() => updateHandler(blog)}> like </button>
      </p>
      <button style={deleteButtonVisible} onClick={() => deleteHandler(blog)}>
        <b>remove </b>
      </button>
    </div>
  )
}
export default Blog
