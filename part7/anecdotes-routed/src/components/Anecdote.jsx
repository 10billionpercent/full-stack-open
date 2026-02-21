const Anecdote = ({ anecdote }) => {
    return (
    <div>
      <div style= {{ display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        gap: '2px'
      }}>
        <h2> {anecdote.content} </h2>
        <p> <b> votes </b> {anecdote.votes} </p>
        <p> for more info see &ensp; <a href={anecdote.info}>{anecdote.info}</a> </p>
      </div>
    </div>
  )
}

export default Anecdote
