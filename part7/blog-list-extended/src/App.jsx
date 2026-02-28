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

const App = () => {
  /*const [blogs, setBlogs] = useState(() => {
    const currentBlogs = window.localStorage.getItem('blogs')
    return currentBlogs ? JSON.parse(currentBlogs) : []
  })*/
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    return loggedInUser ? JSON.parse(loggedInUser) : null
  })

  const notification = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)
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
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
      updateMessage('login successful')
    } catch {
      updateMessage('wrong username or password', 'error')
    }
  }

  const logoutHandler = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const updateLikes = async (blogToUpdate) => {
    const currentLikes = blogToUpdate.likes
    blogToUpdate.likes = currentLikes + 1
    const id = blogs.find((b) => b.id === blogToUpdate.id).id

    const updatedBlog = await blogService.updateBlog(id, blogToUpdate)
    setBlogs(
      blogs.map((blog) =>
        blog.id !== id ? blog : { ...blog, likes: updatedBlog.likes },
      ),
    )
  }

  const deleteBlog = async (blogToDelete) => {
    const id = blogs.find((b) => b.id === blogToDelete.id).id
    if (
      window.confirm(
        `Remove blog ${blogToDelete.title} by ${blogToDelete.author} ?`,
      )
    ) {
      await blogService.deleteBlog(id, user.token)
      setBlogs([...blogs].filter((blog) => blog.id !== id))
    }
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
    <Blogs
      blogs={blogs}
      username={user.username}
      name={user.name}
      logoutHandler={logoutHandler}
      updateHandler={updateLikes}
      deleteHandler={deleteBlog}
    />
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
