import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  return (
    <div className="flex flex-col gap-4 px-4">
      <h2 className="font-bold text-3xl text-blue-300">Users</h2>
      <table className="max-w-fit">
        <thead>
          <tr>
            <th className="text-left font-bold text-lg pr-8"> user</th>
            <th className="text-left font-bold text-lg"> blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>
                <Link to={`/users/${u.id}`} className="font-bold text-lg pr-8">
                  {u.name}
                </Link>
              </td>
              <td> {u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Users
