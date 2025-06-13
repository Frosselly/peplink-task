type InputPropsType = {
  type: React.HTMLInputTypeAttribute
  name: string
  labelValue: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  errMsg: string
} & React.InputHTMLAttributes<HTMLInputElement>

function Input({
  type,
  name,
  labelValue,
  onChange,
  errMsg,
  ...extras
}: InputPropsType) {
  return (
    <div>
      <label htmlFor={name}>{labelValue}</label>
      <input
        type={type}
        name={name}
        id={name}
        onChange={onChange}
        {...extras}
      />
      {errMsg && <label className="errMsg">{errMsg}</label>}
    </div>
  )
}

export default Input
