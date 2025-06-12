import { useState } from 'react'
import type { User } from '../types'
import '../App.css'

type UserFormProps = {
  onSubmit: (formData: User) => void
  onCancel: () => void
}

type missingFieldsType = {
  name: boolean
  position: boolean
  gender: boolean
  age: boolean
}

const UserForm: React.FC<UserFormProps> = ({
  onSubmit,
  onCancel
}: UserFormProps) => {
  const [formData, setFormData] = useState<User>({
    name: '',
    position: '',
    gender: '',
    age: 0
  })

  const [missingFields, setMissingFields] = useState<missingFieldsType>({
    name: false,
    position: false,
    gender: false,
    age: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    const errFields: missingFieldsType = { ...missingFields }
    let canSubmit = true
    for (const k in formData) {
      const key = k as keyof User
      if (!formData[key]) canSubmit = false
      errFields[key] = !formData[key]
    }
    setMissingFields(errFields)

    if (formData && canSubmit) onSubmit(formData)
  }
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    onCancel()
  }

  return (
    <div className="formContainer">
      <h3>Add a new User</h3>
      <form action="">
        <div>
          <label htmlFor="name">{'Name'}</label>
          <input type="text" name="name" id="name" onChange={handleChange} />
          {missingFields.name && <label className="errMsg">Missing name</label>}
        </div>
        <div>
          <label htmlFor="position">{'Position'}</label>
          <input
            type="text"
            name="position"
            id="position"
            onChange={handleChange}
          />
          {missingFields.position && (
            <label className="errMsg">Missing position</label>
          )}
        </div>
        <div>
          <label htmlFor="gender">{'Gender'}</label>
          <input
            type="text"
            name="gender"
            id="gender"
            onChange={handleChange}
          />
          {missingFields.gender && (
            <label className="errMsg">Missing gender</label>
          )}
        </div>
        <div>
          <label htmlFor="age">{'Age'}</label>
          <input
            type="number"
            min={0}
            max={200}
            name="age"
            id="age"
            onChange={handleChange}
          />
          {missingFields.age && (
            <label className="errMsg">Missing or wrong age</label>
          )}
        </div>
        <div className="btnContainer">
          <button onClick={handleSubmit}>Add User</button>
          <button className={'redBtn'} onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default UserForm
