const Anecdote = ({ anecdote, handleClick }) => {
      return (
    <div>
      <div style= {{ display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '12px'
      }}>
        <p> {anecdote.content} </p>
        <p> <b> votes </b> {anecdote.likes}
          <button onClick={handleClick}> vote </button></p>
      </div>
    </div>
  )
}

export default Anecdote
