import { useState } from "react"

const Blog = ({ blog, updateHandler, username, deleteHandler }) => {
         const [visible, setVisible] = useState(false)
        
            const showWhenVisible = { 
              display: visible ? 'flex' : 'none',
              flexDirection: 'column',
              width: 'fit-content'
             }
            const buttonLabel =  visible ? 'hide' : 'show'
            const deleteButtonVisible = {
              display: username === blog.user.username ? 'flex' : 'none',
              width: 'fit-content',
              color: '#ff2c2c',
              border: '2px solid #ff2c2c'
            }

            const toggleVisiblity = () => {
                setVisible(!visible)
            }
        
            return (
                <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.678)' ,
                  padding: '2px'
                }}>
                <div style= {{ display: 'flex', 
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '12px'
              }}> 
                  <h4> {blog.title} </h4>  
                  <button onClick={toggleVisiblity}> {buttonLabel} </button>
                </div>
                <div style={showWhenVisible}>
                <p> <b> url </b> {blog.url} </p> 
                <p> <b> likes </b> {blog.likes} 
                <button onClick={() => updateHandler(blog)}> like </button></p>  
                <p> <b> author </b> {blog.author} </p>
                <button style={deleteButtonVisible}
                onClick={() => deleteHandler(blog)}> <b>remove </b> </button>
                </div>
                </div>

)
}
export default Blog 