import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        removeNotification() {
            return null
        }
    }
})

const { setNotification } = notificationSlice.actions 

let timeoutId = null

export const setNotificationWithTimeout = (message, seconds) => {
    return (dispatch) => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        dispatch(setNotification(message))

        timeoutId = setTimeout(() => {
            dispatch(removeNotification())
        }, seconds * 1000)
    }
}

export const { removeNotification } = notificationSlice.actions
export default notificationSlice.reducer