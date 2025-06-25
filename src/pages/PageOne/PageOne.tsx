import { useEffect, useState } from 'react'
import type { TableColumn, User } from '../../types'
import UserForm from '../../components/UserForm/UserForm'

import Table from '../../components/DraggableTable/Table'
import Input from '../../components/Input/Input'

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

const defaultColumns: TableColumn[] = [
  { key: 'name', label: 'Name', type: 'string' },
  { key: 'position', label: 'Position', type: 'string' },
  { key: 'gender', label: 'Gender', type: 'string' },
  { key: 'age', label: 'Age', type: 'number' }
]

function PageOne() {
  const [showForm, setShowForm] = useState<boolean>(false)
  const [users, setUsers] = useState<User[]>(usersExample)
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])

  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    if (search === '') {
      setFilteredUsers([])
      return
    }
    const searchFormatted = search.toLowerCase()
    const filteredUsers = users.filter((user) => {
      return Object.values(user).some((val) => {
        const valFormatted = String(val).toLowerCase()
        return valFormatted.includes(searchFormatted)
      })
    })

    setFilteredUsers(filteredUsers)
  }, [search])

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
        <Input
          type={'text'}
          name="search"
          labelValue={''}
          onChange={(e) => setSearch(e.target.value)}
          errMsg={''}
        />
        <Table
          data={search !== '' ? filteredUsers : users}
          columns={defaultColumns}
          setData={setUsers}
        />

        <button onClick={() => setShowForm((prev) => !prev)}>Add User</button>
      </div>
    </>
  )
}

export default PageOne
