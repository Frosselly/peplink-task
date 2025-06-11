import { useMemo, useState } from 'react'
import '../App.css'
import type { SortDirection, User, UserSortFields, UserSorting } from '../types'
import UserForm from '../components/UserForm'

const usersExample: User[] = [
  {
    name: 'Ahon Joberson Peter',
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

const compareString = (s1: string, s2: string) => {
  return s1.localeCompare(s2)
}
function PageOne() {
  const [showForm, setShowForm] = useState<boolean>(false)
  const [users, setUsers] = useState<User[]>(usersExample)
  const [sortValue, setSortValue] = useState<UserSorting>({
    field: 'unsorted',
    direction: 'asc'
  })

  const sortedUsers = useMemo(() => {
    if (sortValue.field === 'unsorted') return users
    const sorted = users.slice().sort((a, b) => {
      switch (sortValue.field) {
        case 'name':
          return compareString(a.name, b.name)
        case 'position':
          return compareString(a.position, b.position)
        case 'gender':
          return compareString(a.gender, b.gender)
        case 'age':
          return a.age - b.age
        default:
          return 0
      }
    })
    if (sortValue.direction === 'desc') return sorted.reverse()
    return sorted
  }, [users, sortValue])

  const handleDeleteUser = (deleteIndex: number) => {
    const newUsers = users.filter((_v, index) => index !== deleteIndex)
    setUsers(newUsers)
  }

  const handleChangeSort = (sortField: UserSortFields) => {
    const sortDirection: SortDirection =
      sortValue.field === sortField
        ? sortValue.direction === 'asc'
          ? 'desc'
          : 'asc'
        : 'asc'
    setSortValue({ field: sortField, direction: sortDirection })
  }

  const moveRow = (index: number, direction: 'up' | 'down') => {
    if (
      (users.length - 1 === index && direction === 'down') ||
      (index === 0 && direction === 'up')
    )
      return

    setSortValue({
      field: 'unsorted',
      direction: 'asc'
    })

    const directionAdd = direction === 'up' ? -1 : 1
    const userCopy = users.slice()
    const copyRow = users[index + directionAdd]
    userCopy[index + directionAdd] = userCopy[index]
    userCopy[index] = copyRow
    setUsers(userCopy)
  }

  const renderSortDirection = (fieldName: UserSortFields) => {
    if (sortValue.field === 'unsorted' || sortValue.field !== fieldName)
      return ''
    return sortValue.direction === 'asc' ? '↑' : '↓'
  }

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
              <th></th>
              <th role="button" onClick={() => handleChangeSort('name')}>
                Name {renderSortDirection('name')}
              </th>
              <th role="button" onClick={() => handleChangeSort('position')}>
                Position {renderSortDirection('position')}
              </th>
              <th role="button" onClick={() => handleChangeSort('gender')}>
                Gender {renderSortDirection('gender')}
              </th>
              <th role="button" onClick={() => handleChangeSort('age')}>
                Age {renderSortDirection('age')}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!!!users.length ? (
              <tr>
                <td colSpan={5}>The user list is empty</td>
              </tr>
            ) : (
              sortedUsers.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <button onClick={() => moveRow(index, 'up')}>↑</button>
                      <button onClick={() => moveRow(index, 'down')}>↓</button>
                    </td>
                    <td>{user.name}</td>
                    <td>{user.position}</td>
                    <td>{user.gender}</td>
                    <td>{user.age}</td>
                    <td>
                      <button
                        className={'redBtn'}
                        onClick={() => handleDeleteUser(index)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
        <button onClick={() => setShowForm((prev) => !prev)}>Add User</button>
      </div>
    </>
  )
}

export default PageOne
