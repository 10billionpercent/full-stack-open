import Blog from "./Blog"

const Blogs = ({
    name,
    logoutHandler,
    blogs
}) => {
    return (
        <>
        <h4>{name} logged in <button onClick={() => logoutHandler()}> logout </button> </h4>
        <h2>Blogs</h2>
    <ul>
    {blogs.map(blog => <Blog key={ blog.id } blog={ blog }/>)}
    </ul>
        </>
    )
}
export default Blogs