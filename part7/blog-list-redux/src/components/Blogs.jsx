import { Link } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'

const Blogs = ({ blogs }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-3xl text-blue-300">Blogs</h2>
      <div className="flex flex-col gap-4">
        {sortedBlogs.map((b) => (
          <Link
            key={b.id}
            to={`/blogs/${b.id}`}
            className="flex flex-row gap-4 items-center font-bold text-lg"
          >
            {b.title} <BsArrowRight />
          </Link>
        ))}
      </div>
    </div>
  )
}
export default Blogs
