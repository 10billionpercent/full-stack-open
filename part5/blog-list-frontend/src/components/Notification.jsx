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

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }
  return (
    <div style = {type === 'success' ? success : error}>
      {message}
    </div>
  )
}
export default Notification