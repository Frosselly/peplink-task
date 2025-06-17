import { useState } from 'react'
import type { User } from '../../types'
import UserForm from '../../components/UserForm/UserForm'

import Table from '../../components/DraggableTable/Table'

const usersExample: User[] = [
  {
    name: 'Ahon Joberson PeterAhon Joberson PeterAhon Joberson Peter',
    position: 'Janitor',
    gender: 'male',
    age: 23
  },
  {
    name: 'Lucy',
    position: 'Director',
    gender: 'female',
    age: 42
  },
  {
    name: 'Sam',
    position: 'Developer',
    gender: 'male',
    age: 32
  }
]

const defaultColumns = [
  { key: 'name', label: 'Name', type: 'string' },
  { key: 'position', label: 'Position', type: 'string' },
  { key: 'gender', label: 'Gender', type: 'string' },
  { key: 'age', label: 'Age', type: 'number' }
]

function PageOne() {
  const [showForm, setShowForm] = useState<boolean>(false)
  const [users, setUsers] = useState<User[]>(usersExample)

  return (
    <>
      {showForm && (
        <UserForm
          onSubmit={(formData) => {
            setShowForm((prev) => !prev)
            setUsers((prev) => [...prev, formData])
          }}
          onCancel={() => setShowForm((prev) => !prev)}
        />
      )}
      <div>
        <h1>Users</h1>
        <input type="text" placeholder="Search" />
        <Table data={users} columns={defaultColumns} setData={setUsers} />

        <button onClick={() => setShowForm((prev) => !prev)}>Add User</button>
      </div>
    </>
  )
}

export default PageOne
