import Blog from "./Blog"

const Blogs = ({
    name,
    logoutHandler,
    blogs,
    updateHandler
}) => {

    const sortedBlogs = [...blogs].sort((a,b) => b.likes - a.likes)
    return (
        <>
        <h4>{name} logged in <button onClick={() => logoutHandler()}> logout </button> </h4>
        <h2>Blogs</h2>
    <ul>
    {sortedBlogs.map(blog => <Blog key={blog.id} blog={blog} updateHandler={updateHandler}/>)}
    </ul>
        </>
    )
}
export default Blogs