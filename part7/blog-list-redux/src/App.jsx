import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Toggler from './components/Toggler'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Menu from './components/Menu'
import loginService from './services/login'
import blogService from './services/blogs'
import userService from './services/users'
import { setBlogs, deleteBlog } from './reducers/blogReducer'
import { setNotificationWithTimeout } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'
import Users from './components/Users'
import User from './components/User'
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [allUsers, setAllUsers] = useState([])

  const notification = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
      setAllUsers(users)
    }
    getUsers()
  }, [dispatch])

  const removeBlog = async (blogToDelete) => {
    if (
      window.confirm(
        `Remove blog ${blogToDelete.title} by ${blogToDelete.author} ?`,
      )
    ) {
      try {
        dispatch(deleteBlog(blogToDelete, user))
        navigate('/', { replace: true })
        updateMessage(`${blogToDelete.title} by ${blogToDelete.author} deleted`)
      } catch (err) {
        updateMessage(err.message)
      }
    }
  }
  const userMatch = useMatch('/users/:id')
  const matchedUser = userMatch
    ? allUsers.find((u) => u.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const matchedBlog = blogMatch
    ? blogs.find((b) => b.id === blogMatch.params.id)
    : null

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

  const blogList = () => <Blogs blogs={blogs} />

  const blogForm = () => (
    <Toggler buttonLabel="create new blog">
      <BlogForm user={user} />
    </Toggler>
  )

  return (
    <div className="flex flex-col gap-4">
      <Menu user={user} logoutHandler={logoutHandler} />
      <Notification notification={notification} />
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <div className="flex flex-row gap-8 px-4">
                {blogList()}
                {blogForm()}
              </div>
            ) : (
              loginForm()
            )
          }
        />
        <Route path="/users" element={<Users users={allUsers} />} />
        <Route
          path="/users/:id"
          element={
            user ? (
              <User user={matchedUser} />
            ) : (
              <div>
                <h3> login to see user details</h3>
                {loginForm()}
              </div>
            )
          }
        />
        <Route
          path="/blogs/:id"
          element={
            user ? (
              <Blog
                blog={matchedBlog}
                username={user.username}
                deleteHandler={removeBlog}
              />
            ) : (
              <div>
                <h3> login to see blog details</h3>
                {loginForm()}
              </div>
            )
          }
        />
      </Routes>
    </div>
  )
}

export default App
