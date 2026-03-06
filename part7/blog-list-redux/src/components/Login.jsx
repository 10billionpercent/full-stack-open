const Login = ({
  loginHandler,
  username,
  password,
  usernameHandler,
  passwordHandler,
}) => {
  return (
    <form onSubmit={loginHandler} className="px-4 w-fit">
      <h2 className="font-bold text-3xl text-blue-300"> Login </h2>
      <div className="flex flex-row gap-4">
        <label>username</label>
        <input value={username} onChange={usernameHandler} />
      </div>
      <div className="flex flex-row gap-4">
        <label>password</label>
        <input type="password" value={password} onChange={passwordHandler} />
      </div>
      <div>
        <button type="submit" className="w-full">
          login
        </button>
      </div>
    </form>
  )
}
export default Login
