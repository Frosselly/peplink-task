import { useState } from 'react'
import './App.css'
import UserForm from './components/UserForm'
import type { User } from './types'

const usersExample: User[] = [
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
  const [showForm, setShowForm] = useState<boolean>(false)
  const [users, setUsers] = useState<User[]>(usersExample)

  return (
    <>
      {showForm && (
        <UserForm
          onSubmit={(formData) => {
            console.log(formData)
            setShowForm((prev) => !prev)
            setUsers((prev) => [...prev, formData])
          }}
          onCancel={() => setShowForm((prev) => !prev)}
        />
      )}
      <div>
        <h1>Users</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Gender</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.position}</td>
                  <td>{user.gender}</td>
                  <td>{user.age}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <button onClick={() => setShowForm((prev) => !prev)}>Add User</button>
      </div>
    </>
  )
}

export default App
