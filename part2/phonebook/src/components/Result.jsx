const Result = (props) => {
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