import { Link } from 'react-router-dom'
import { BsXSquare } from 'react-icons/bs'

const Menu = ({ user, logoutHandler }) => {
  return (
    <div className="bg-navbar flex items-center justify-between border-b border-blue-300 p-4">
      <span className="text-4xl font-bold m-0 leading-tight inline-block text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-blue-400">
        Bloglist
      </span>
      <div className="flex items-center gap-10">
        <Link to="/" className="text-xl">
          blogs
        </Link>
        <Link to="/users" className="text-xl">
          users
        </Link>
        {user && (
          <div className="flex items-center gap-4">
            <span className="m-0 text-lg">
              <span className="text-blue-300 font-bold">{user.name}</span>
              &thinsp; logged in
            </span>
            <button
              className="text-lg p-2 text-error border-2 border-error flex flex-row gap-2 items-center"
              onClick={() => logoutHandler()}
            >
              <BsXSquare />
              logout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Menu
