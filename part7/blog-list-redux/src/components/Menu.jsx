import { Link } from 'react-router-dom'

const Menu = ({ user, logoutHandler }) => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '4px',
        alignItems: 'center',
        padding: 0,
        margin: 0,
      }}
    >
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {user && (
        <h4>
          {user.name} logged in
          <button onClick={() => logoutHandler()}> logout </button>
        </h4>
      )}
    </div>
  )
}

export default Menu
