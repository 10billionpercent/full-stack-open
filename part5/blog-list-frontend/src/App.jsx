import { useState, useEffect } from 'react'
import Login from './components/Login'
import Add from './components/Add'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import blogService from './services/blogs'


const App = () => {
  const [blogs, setBlogs] = useState(() => {
    const currentBlogs = window.localStorage.getItem('blogs')
    return currentBlogs ? JSON.parse(currentBlogs) : []
  }) 
  const [message, setMessage] = useState(null)
  const [type, setType] = useState('success')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')
  const [user, setUser] = useState(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    return loggedInUser ? JSON.parse(loggedInUser) : null
  })

  useEffect(() => {
     if (user) {
        blogService.setToken(user.token)
     }
  }, [user])

  useEffect(() => {
    async function fetchBlogs() {
    if (user) {
    const blogs = await blogService.getBlogs()
    setBlogs(blogs)
    window.localStorage.setItem(
        'blogs', JSON.stringify(blogs)
      )
    }
    }
    fetchBlogs()
      }, [user])

  const handleUsernameChange = (e) => {
        setUsername(e.target.value)
  }
  const handlePasswordChange = (e) => {
        setPassword(e.target.value)
  }
  const handleTitleChange = (e) => {
        setTitle(e.target.value)
  }
  const handleAuthorChange = (e) => {
        setAuthor(e.target.value)
  }
  const handleUrlChange = (e) => {
        setUrl(e.target.value)
  }
  const handleLikesChange = (e) => {
        setLikes(e.target.value)
  }

  const updateMessage = (newMessage, newType='success') => {
    setMessage(newMessage)
    setType(newType)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
  }

  const loginHandler = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )

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

  const addBlog = async (e) => {
        e.preventDefault()
    if (title === '' || author === '' || url === '') {
      alert('enter all details')
      return
    }
    let newBlog = {title: title, author: author, url: url, likes: likes}
    try {
     const addedBlog = await blogService.addBlog(newBlog, user.token)
    setBlogs([...blogs, addedBlog])
    updateMessage(`Added ${title} by ${author}`, 'success')
    setTitle('')
    setAuthor('')
    setUrl('') 
    setLikes('')  
    } 
    catch (err) {
      updateMessage(err.response.data.error, 'error')
    }
  }

  return (
    <div>
      <h1>Bloglist</h1>
      <Notification message={message} type = {type} />
      {!user && <Login loginHandler={loginHandler} username={username} usernameHandler={handleUsernameChange}
      password={password} passwordHandler={handlePasswordChange}/>}
      {user && <Blogs blogs ={blogs} name={user.name} logoutHandler = {logoutHandler} />}
      {user && <Add title={title} titleHandler={handleTitleChange}
      author={author} authorHandler={handleAuthorChange} 
      url={url} urlHandler={handleUrlChange}
      likes={likes} likesHandler={handleLikesChange}
      addHandler={addBlog} />}
       </div>  
  )
}

export default App