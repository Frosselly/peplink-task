import { useState } from 'react'
import type { User } from '../types'

type UserFormProps = {
  onSubmit: (formData: User) => void
  onCancel: () => void
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<User>({
    name: '',
    position: '',
    gender: '',
    age: 0
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (formData) onSubmit(formData)
  }

  const handleCancel = (e: any) => {
    e.preventDefault()
    onCancel()
  }

  return (
    <div className="formContainer">
      <h3>Add a new User</h3>
      <form action="">
        <label>
          {'Name'}
          <input type="text" name="name" id="" onChange={handleChange} />
        </label>
        <label>
          {'Position'}
          <input type="text" name="position" id="" onChange={handleChange} />
        </label>
        <label>
          {'Gender'}
          <input type="text" name="gender" id="" onChange={handleChange} />
        </label>
        <label>
          {'Age'}
          <input type="number" name="age" id="" onChange={handleChange} />
        </label>
        <button onClick={handleSubmit}>Add User</button>
        <button className={'redBtn'} onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  )
}

export default UserForm
