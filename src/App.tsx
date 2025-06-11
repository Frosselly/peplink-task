import './App.css'

type User = {
  name: string
  position: string
  gender: string
  age: number
}

const users: User[] = [
  {
    name: 'Jhon Joberson Peter',
    position: 'Janitor',
    gender: 'Male',
    age: 23
  },
  {
    name: 'Lucy',
    position: 'Director',
    gender: 'Female',
    age: 42
  },
  {
    name: 'Sam',
    position: 'Developer',
    gender: 'Male',
    age: 32
  }
]

function App() {
  return (
    <>
      <div>
        <table>
          <thead>
            <th>Name</th>
            <th>Position</th>
            <th>Gender</th>
            <th>Age</th>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.position}</td>
                  <td>{user.gender}</td>
                  <td>{user.age}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
