import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      const loggedInUser = window.localStorage.getItem('loggedInUser')
      return loggedInUser ? JSON.parse(loggedInUser) : action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
