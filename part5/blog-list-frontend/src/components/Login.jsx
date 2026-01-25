const Login = ({
  loginHandler,
  username,
  password,
  usernameHandler,
  passwordHandler
}) => {
    return (
        <form onSubmit={loginHandler}>
        <h2> Login </h2>
        <div>
        <label>
          username
          <input value ={username} onChange={usernameHandler}/>
        </label>
        </div>
        <div>
        <label>
          password
          <input type="password" value ={password} onChange={passwordHandler}/>
        </label>
        </div>
         <div>
          <button type="submit">login</button>
        </div>
      </form>
    )
}
export default Login