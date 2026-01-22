import { useState, useEffect } from 'react'
import Login from './components/Login'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import blogService from './services/blogs'


const App = () => {
  const [blogs, setBlogs] = useState([]) 
  const [message, setMessage] = useState(null)
  const [type, setType] = useState('success')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function fetchBlogs() {
    if (user) {
    const blogs = await blogService.getBlogs()
    setBlogs(blogs)
    console.log('fetched', blogs)
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

  const updateMessage = (newMessage, newType='success') => {
    setMessage(newMessage)
    setType(newType)
      setTimeout(() => {
        setMessage(null)
      },5000)
  }

  const loginHandler = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password})
      setUser(user)
      setUsername('')
      setPassword('')
      updateMessage('login succesful')
      blogService.setToken(user.token)
    } catch {
      updateMessage('wrong credentials', 'error')
    }
  }
/*const updateMessage = (newMessage, newType='success') => {
    setMessage(newMessage)
    setType(newType)
      setTimeout(() => {
        setMessage(null)
      },5000)
  }
  const addName = (e) => {
        e.preventDefault()
    if (blogs.some(blog => blog.name ===newName)) {
      if (window.confirm(`Update ${newName} ?`)) {
        let blogToUpdate = blogs.find(p => p.name === newName)
        let updatedblog = {...blogToUpdate, number: newNumber}
        const id = updatedblog.id
        blogservice
        .updateblog(id, updatedblog)
        .then(returnedblog => {
          setblogs(blogs.map(p => p.id === id ? returnedblog : p))
           updateMessage(`Updated ${newName}`)}
        )
        .catch(err => {
          updateMessage(err.response.data.error, 'error')
        })
      }
      setNewName('')
      setNewNumber('')
      return
    }
    if (newName === '' || newNumber === '') {
      alert('enter all details')
      return
    }
    let newblog = {name : newName, number: newNumber}
    blogservice
    .addblog(newblog)
    .then(returnedblog =>{ 
    setblogs([...blogs, returnedblog])
    updateMessage(`Added ${newName}`, 'success')
    setNewName('')
    setNewNumber('')    
    })
    .catch(err => {
      updateMessage(err.response.data.error, 'error')
    })
  }*/

  return (
    <div>
      <h2>Bloglist</h2>
      <Notification message={message} type = {type} />
      {!user && <Login loginHandler={loginHandler} username={username} usernameHandler={handleUsernameChange}
      password={password} passwordHandler={handlePasswordChange}/>}
      {user && <Blogs blogs ={blogs} name={user.name}/>}
       </div>  
  )
}

export default App