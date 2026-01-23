const Add = (props) => {
    return (
        <form onSubmit={props.addHandler}>
        <h2> Add new blog </h2>
        <div>
        <label>
          title
          <input value ={props.title} onChange={props.titleHandler}/>
        </label>
        </div>
        <div>
        <label>
          author
          <input value ={props.author} onChange={props.authorHandler}/>
        </label>
        </div>
        <div>
        <label>
          url
          <input value ={props.url} onChange={props.urlHandler}/>
        </label>
        </div>
        <div>
        <label>
          likes
          <input value ={props.likes} onChange={props.likesHandler}/>
        </label>
        </div>
         <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}
export default Add