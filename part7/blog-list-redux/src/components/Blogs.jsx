import { Link } from 'react-router-dom'
import Blog from './Blog'

const Blogs = ({ blogs }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <>
      <h2>Blogs</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {sortedBlogs.map((b) => (
          <Link key={b.id} to={`/blogs/${b.id}`}>
            {b.title}
          </Link>
        ))}
      </div>
    </>
  )
}
export default Blogs
