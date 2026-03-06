const success = 'text-lg text-success p-2 border-2 border-success rounded-lg'

const error = 'text-lg text-error p-2 border-2 border-error rounded-lg'

const Notification = ({ notification }) => {
  if (!notification) {
    return null
  }
  const { message, type } = notification
  return (
    <div id="notification" className={type === 'success' ? success : error}>
      {message}
    </div>
  )
}
export default Notification
