import styles from './Input.module.css'

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
      <label className={styles.label} htmlFor={name}>
        {labelValue}
      </label>
      <input
        className={styles.input}
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
