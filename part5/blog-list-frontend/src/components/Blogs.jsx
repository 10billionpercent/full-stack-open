const Blogs = (props) => {
    return (
        <>
        <h2>{props.name} logged in <button onClick={() => props.logoutHandler()}> logout </button> </h2>
        <h2>Blogs</h2>
      <div>
        {props.blogs.map(blog => <p key={blog.id}>{blog.title} </p>)}
        </div>
        </>
    )
}
export default Blogs