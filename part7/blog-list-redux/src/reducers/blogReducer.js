import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    createBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const blogUpdatedInServer = action.payload
      return state.map((b) =>
        b.id === blogUpdatedInServer.id ? blogUpdatedInServer : b,
      )
    },
    removeBlog(state, action) {
      const blogDeletedInServer = action.payload
      return state.filter((b) => b.id !== blogDeletedInServer.id)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

const { setBlogs, createBlog, updateBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const appendBlog = (newBlog, user) => {
  return async (dispatch) => {
    const addedBlog = await blogService.addBlog(newBlog, user.token)
    dispatch(createBlog(addedBlog))
  }
}

export const increaseLikes = (blog) => {
  return async (dispatch) => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    const updatedBlog = await blogService.updateBlog(likedBlog)

    dispatch(
      updateBlog({
        ...updatedBlog,
        user: blog.user,
      }),
    )
  }
}

export const addComment = (id, comment) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.addComment(id, comment)
    dispatch(
      updateBlog({
        ...updatedBlog,
      }),
    )
  }
}

export const deleteBlog = (blogToDelete, user) => {
  console.log(blogToDelete.id, user)
  return async (dispatch) => {
    await blogService.deleteBlog(blogToDelete.id, user.token)
    dispatch(
      removeBlog({
        ...blogToDelete,
        user: blogToDelete.user,
      }),
    )
  }
}
export { setBlogs }
export default blogSlice.reducer
