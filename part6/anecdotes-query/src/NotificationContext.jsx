import  { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
    const content = action.payload
    switch (action.type) {
        case 'ADDED':
            return { message: `you added '${content}'`, type: 'success' }
        case 'VOTED':
            return { message: `you voted for '${content}'`, type: 'success' }
        case 'ERROR':
            return { message:'too short anecdote, must have length 5 or more', type: 'error' }
        case 'CLEAR':
            return null
        default:
            return state
    }
}

const NotificationContext = createContext()
let timeoutId = null

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)


    const showNotification = (type, content, seconds = 5) => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        notificationDispatch({ type, payload: content })

        timeoutId = setTimeout(() => {
            notificationDispatch({ type: 'CLEAR' })
        }, seconds * 1000)
    }

    return (
        <NotificationContext.Provider value={{ notification, showNotification }}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext