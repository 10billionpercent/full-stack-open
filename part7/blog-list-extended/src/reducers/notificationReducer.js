import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return null
    },
  },
})

const { setNotification, removeNotification } = notificationSlice.actions

let timeoutId = null

export const setNotificationWithTimeout = (message, type) => {
  console.log('notif sent', message, type)
  return (dispatch) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    dispatch(setNotification({ message, type }))

    timeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }
}

export { removeNotification }
export default notificationSlice.reducer
