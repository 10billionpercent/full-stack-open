const Blog = ({ blog, updateHandler, username, deleteHandler }) => {
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
      <p> added by {blog.user.name}</p>
      <h3> comments</h3>
      <ul>
        {blog.comments.length !== 0 ? (
          blog.comments.map((c, i) => <li key={i}> {c} </li>)
        ) : (
          <p> no comments yet</p>
        )}
      </ul>
      <button style={deleteButtonVisible} onClick={() => deleteHandler(blog)}>
        <b>remove </b>
      </button>
    </div>
  )
}
export default Blog
