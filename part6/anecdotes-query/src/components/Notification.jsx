import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const success = {
    color: '#12e607', 
    padding: '10px',
    border: '1px solid #12e607',
    borderRadius: '10px'
}

const error = {
    color: '#ea3c3c', 
    padding: '10px',
    border: '1px solid #ea3c3c',
    borderRadius: '10px'
}

const Notification = () => {
  const { notification } = useContext(NotificationContext)
    if (notification === null) {
        return null
    }
    return (
        <div style = {notification.type === 'success' ? success : error}>
            {notification.message}
        </div>
    )
}
export default Notification