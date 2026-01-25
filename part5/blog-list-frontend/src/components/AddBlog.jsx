import { useState } from 'react'

const Add = ({ addHandler }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  const addBlog = (e) => {
    e.preventDefault()
    if (title === '' || author === '' || url === '') {
    alert('enter all details')
      return
    }
    addHandler({title: title, 
      author: author, 
      url: url, 
      likes: likes})
    setTitle('')
    setAuthor('')
    setUrl('') 
    setLikes('')  
  }

    return (
        <form onSubmit={addBlog}>
        <h2> add new blog </h2>
        <div>
        <label>
          title
          <input value ={title} onChange={e => setTitle(e.target.value)}/>
        </label>
        </div>
        <div>
        <label>
          author
          <input value ={author} onChange={e => setAuthor(e.target.value)}/>
        </label>
        </div>
        <div>
        <label>
          url
          <input value ={url} onChange={e => setUrl(e.target.value)}/>
        </label>
        </div>
        <div>
        <label>
          likes
          <input value ={likes} onChange={e => setLikes(e.target.value)}/>
        </label>
        </div>
         <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}
export default Add