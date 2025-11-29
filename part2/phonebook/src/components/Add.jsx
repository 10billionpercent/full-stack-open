const Add = (props) => {
    return (
        <form onSubmit={props.addHandler}>
        <h2>Add new </h2>
        <div>
          name = <input value ={props.newName} onChange={props.nameHandler}/>
        </div>
        <div>
          phone number = <input value ={props.newNumber} onChange={props.numberHandler}/>
        </div>
         <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}
export default Add