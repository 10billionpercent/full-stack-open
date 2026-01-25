const Add = ({
  addHandler,
  title,
  author,
  url,
  likes,
  titleHandler,
  authorHandler,
  urlHandler,
  likesHandler
}) => {
    return (
        <form onSubmit={addHandler}>
        <h2> add new blog </h2>
        <div>
        <label>
          title
          <input value ={title} onChange={titleHandler}/>
        </label>
        </div>
        <div>
        <label>
          author
          <input value ={author} onChange={authorHandler}/>
        </label>
        </div>
        <div>
        <label>
          url
          <input value ={url} onChange={urlHandler}/>
        </label>
        </div>
        <div>
        <label>
          likes
          <input value ={likes} onChange={likesHandler}/>
        </label>
        </div>
         <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}
export default Add