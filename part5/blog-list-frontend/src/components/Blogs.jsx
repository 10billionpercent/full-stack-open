const Blogs = (props) => {
    console.log(props.blogs)
    return (
        <>
        <h2>Blogs</h2>
        <h2>{props.name} logged in </h2>
      <div>
        {props.blogs.map(blog => <p key={blog.id}>{blog.title} </p>)}
        </div>
        </>
    )
}
export default Blogs