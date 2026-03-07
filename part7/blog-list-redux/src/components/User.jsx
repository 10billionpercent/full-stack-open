import { BsPersonLinesFill, BsArrowRight } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  if (!user) {
    return null
  }
  const blogs = user.blogs
  return (
    <div className="flex  flex-col gap-4 px-4">
      <div className="flex gap-4 items-center">
        <BsPersonLinesFill className="text-3xl text-blue-300" />
        <h2 className="font-bold text-3xl text-blue-300"> {user.name}</h2>
      </div>
      <h4 className="text-2xl font-bold"> added blogs</h4>
      <ul>
        {blogs.map((b) => (
          <Link
            key={b.id}
            to={`/blogs/${b.id}`}
            className="flex flex-row gap-4 items-center font-bold text-lg"
          >
            {b.title} <BsArrowRight />
          </Link>
        ))}
      </ul>
    </div>
  )
}
export default User
