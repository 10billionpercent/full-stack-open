import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const success = {
    color: '#12e607', 
    padding: '10px',
    border: '1px solid #12e607',
    borderRadius: '10px'
}

const error = {
    color: '#e52929ff', 
    padding: '10px',
    border: '1px solid #e52929ff',
    borderRadius: '10px'
}

const Notification = () => {
  const { notification } = useContext(NotificationContext)
    if (notification === null) {
        return null
    }
    return (
        <div style = {success}>
            {notification}
        </div>
    )
}
export default Notification