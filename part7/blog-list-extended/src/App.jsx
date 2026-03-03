import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Toggler from './components/Toggler'
import Login from './components/Login'
import AddBlog from './components/BlogForm'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import blogService from './services/blogs'
import userService from './services/users'
import { setBlogs } from './reducers/blogReducer'
import { setNotificationWithTimeout } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'
import Users from './components/Users'
import { Routes, Route, useNavigate, useMatch } from 'react-router-dom'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [allUsers, setAllUsers] = useState([])

  const notification = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token)
    }
  }, [user])

  useEffect(() => {
    async function fetchBlogs() {
      if (user) {
        const blogs = await blogService.getBlogs()
        dispatch(setBlogs(blogs))
        window.localStorage.setItem('blogs', JSON.stringify(blogs))
      }
    }
    fetchBlogs()
  }, [dispatch, user])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      dispatch(setUser(JSON.parse(loggedInUser)))
    }
    async function getUsers() {
      const users = await userService.getAllUsers()
      setAllUsers(
        users.map((u) => ({ name: u.name, blogs: u.blogs.length, id: u.id })),
      )
    }
    getUsers()
  }, [])

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const updateMessage = (newMessage, newType = 'success') => {
    dispatch(setNotificationWithTimeout(newMessage, newType))
  }

  const loginHandler = async (e) => {
    e.preventDefault()
    try {
      const loggedInUser = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))

      dispatch(setUser(loggedInUser))
      setUsername('')
      setPassword('')
      updateMessage('login successful')
    } catch {
      updateMessage('wrong username or password', 'error')
    }
  }

  const logoutHandler = () => {
    window.localStorage.clear()
    dispatch(setUser(null))
  }

  const loginForm = () => (
    <Login
      loginHandler={loginHandler}
      username={username}
      usernameHandler={handleUsernameChange}
      password={password}
      passwordHandler={handlePasswordChange}
    />
  )

  const blogList = () => <Blogs blogs={blogs} user={user} />

  const blogForm = () => (
    <Toggler buttonLabel="create new blog">
      <AddBlog user={user} />
    </Toggler>
  )

  return (
    <div>
      <h1>Bloglist</h1>
      <Notification notification={notification} />
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <div>
                <h4>
                  {user.name} logged in
                  <button onClick={() => logoutHandler()}> logout </button>
                </h4>
                {blogList()}
                {blogForm()}
              </div>
            ) : (
              loginForm()
            )
          }
        />
        <Route path="/users" element={<Users users={allUsers} />} />
      </Routes>
    </div>
  )
}

export default App
