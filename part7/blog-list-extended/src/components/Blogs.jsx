import Blog from "./Blog";

const Blogs = ({
  username,
  name,
  logoutHandler,
  blogs,
  updateHandler,
  deleteHandler,
}) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
  return (
    <>
      <h4>
        {name} logged in{" "}
        <button onClick={() => logoutHandler()}> logout </button>{" "}
      </h4>
      <h2>Blogs</h2>
      <ul>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateHandler={updateHandler}
            username={username}
            deleteHandler={deleteHandler}
          />
        ))}
      </ul>
    </>
  );
};
export default Blogs;
