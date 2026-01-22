const Result = (props) => {
    if (props.found.length===0) {
      return null
    }
    return (
        <>
        <h2>Search Result</h2>
      <div>
        {props.found.map(person => <p key={person.id}>{person.name} = {person.number}</p>)}
        </div>
        </>
    )
}
export default Result