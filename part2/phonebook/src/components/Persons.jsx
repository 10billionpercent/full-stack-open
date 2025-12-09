const Persons = (props) => {
    return (
        <>
        <h2>Numbers</h2>
      <div>
        {props.persons.map(person => <p key={person.id}>{person.name} = {person.number}  <button onClick = {() => props.deleteHandler(person)}> delete </button></p>)}
        </div>
        </>
    )
}
export default Persons