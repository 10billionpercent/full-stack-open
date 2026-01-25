const Blogs = ({
    name,
    logoutHandler,
    blogs
}) => {
    return (
        <>
        <h4>{name} logged in <button onClick={() => logoutHandler()}> logout </button> </h4>
        <h2>Blogs</h2>
      <div>
        {blogs.map(blog => <p key={blog.id}>{blog.title} </p>)}
        </div>
        </>
    )
}
export default Blogs