import { useState } from 'react'
import type { User } from '../types'
import Input from './Input'

type UserFormProps = {
  onSubmit: (formData: User) => void
  onCancel: () => void
}

type MissingFieldsType = {
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

  const [missingFields, setMissingFields] = useState<MissingFieldsType>({
    name: false,
    position: false,
    gender: false,
    age: false
  })

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const checkIfValid = (fieldValue: string) => {
    const num = Number(fieldValue)
    if (!isNaN(num)) {
      return num > 0
    }
    return fieldValue.trim().length > 0
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    const errFields: MissingFieldsType = { ...missingFields }
    let canSubmit = true
    for (const k in formData) {
      const key = k as keyof User
      const isValid =
        typeof formData[key] === 'string' ? checkIfValid(formData[key]) : false

      if (!isValid) canSubmit = false
      errFields[key] = !isValid
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
        <Input
          type={'text'}
          name="name"
          labelValue={'Name'}
          onChange={handleChange}
          errMsg={missingFields.name ? 'Missing name' : ''}
        />
        <Input
          type={'text'}
          name="position"
          labelValue={'Position'}
          onChange={handleChange}
          errMsg={missingFields.position ? 'Missing position' : ''}
        />
        <div>
          <label htmlFor="gender">Gender</label>
          <select
            name="gender"
            id="gender"
            onChange={handleChange}
            defaultValue={''}>
            <option value="" hidden>
              Select gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {missingFields.gender && (
            <label className="errMsg">Missing gender</label>
          )}
        </div>
        <Input
          type={'number'}
          name="age"
          min={1}
          max={200}
          labelValue={'Age'}
          onChange={handleChange}
          errMsg={missingFields.age ? 'Missing or wrong age' : ''}
        />
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
