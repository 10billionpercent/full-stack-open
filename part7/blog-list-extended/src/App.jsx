import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Toggler from './components/Toggler'
import Login from './components/Login'
import AddBlog from './components/BlogForm'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import blogService from './services/blogs'
import { setBlogs } from './reducers/blogReducer'
import { setNotificationWithTimeout } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
      console.log(user)
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

  const blogList = () => (
    <Blogs blogs={blogs} user={user} logoutHandler={logoutHandler} />
  )

  const blogForm = () => (
    <Toggler buttonLabel="create new blog">
      <AddBlog user={user} />
    </Toggler>
  )

  return (
    <div>
      <h1>Bloglist</h1>
      <Notification notification={notification} />
      {!user && loginForm()}
      {user && (
        <div>
          {blogList()}
          {blogForm()}
        </div>
      )}
    </div>
  )
}

export default App
