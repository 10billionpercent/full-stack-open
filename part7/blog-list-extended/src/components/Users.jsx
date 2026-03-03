const Users = ({ users }) => {
  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th> user</th>
            <th> blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td> {u.name}</td>
              <td> {u.blogs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
export default Users
