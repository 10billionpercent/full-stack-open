import { setNotification, removeNotification } from "./notificationReducer"

let timeoutId = null

export const setNotificationWithTimeout = (message, seconds) => {
    return dispatch => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        dispatch(setNotification(message))

        timeoutId = setTimeout(() => {
            dispatch(removeNotification())
        }, seconds * 1000)
    }
}