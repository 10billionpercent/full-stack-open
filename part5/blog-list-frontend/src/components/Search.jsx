const Search = (props) => {
return (
    <form onSubmit={props.searchHandler}>
        <div>
          enter name to search = <input value ={props.search} onChange={props.inputHandler}/>
        </div>
        <button type="submit">search</button>
        </form>
)
}
export default Search