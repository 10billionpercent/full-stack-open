import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    createBlog(state, action) {
      state.push(action.payload)
    },
    likeBlog(state, action) {
      const blogUpdatedInServer = action.payload
      return state.map((a) =>
        a.id === blogUpdatedInServer.id ? blogUpdatedInServer : a,
      )
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

const { setBlogs, createBlog, likeBlog } = blogSlice.actions

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
      likeBlog({
        ...updatedBlog,
        user: blog.user,
      }),
    )
  }
}

export { setBlogs }
export default blogSlice.reducer
