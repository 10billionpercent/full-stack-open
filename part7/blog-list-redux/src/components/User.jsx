const User = ({ user }) => {
  if (!user) {
    return null
  }
  console.log(user)
  const blogs = user.blogs
  return (
    <div>
      <h2> {user.name} </h2>
      <h4> added blogs</h4>
      <ul>
        {blogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  )
}
export default User
