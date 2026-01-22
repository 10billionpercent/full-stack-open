const Login = (props) => {
    return (
        <form onSubmit={props.loginHandler}>
        <h2> Login </h2>
        <div>
        <label>
          username
          <input value ={props.username} onChange={props.usernameHandler}/>
        </label>
        </div>
        <div>
        <label>
          password
          <input type="password" value ={props.password} onChange={props.passwordHandler}/>
        </label>
        </div>
         <div>
          <button type="submit">login</button>
        </div>
      </form>
    )
}
export default Login