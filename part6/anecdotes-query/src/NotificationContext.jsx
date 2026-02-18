import  { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
    const content = action.payload
    switch (action.type) {
        case 'ADDED':
            return `you added '${content}'`
        case 'VOTED':
            return `you voted for '${content}'`
        case 'ERROR':
            return 'too short anecdote, must have length 5 or more'
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