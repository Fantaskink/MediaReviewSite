import './FormInput.css'
import { useState } from 'react'

type values = {
  username: string,
  email_address: string,
  password: string,
  confirmPassword: string,
};

type FormInputProps = {
    value: values,
    name: string,
    placeholder: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    id: number,
    label: string,
    errorMessage: string,
    focused: string,
  };


function FormInput(props: FormInputProps) {
  const [focused, setFocused] = useState(false)
  const {label, errorMessage, onChange, ...inputProps} = props

  const handleFocus = () => {
    setFocused(true)
  }

  return (
    <div className="form-input">
      <label>{label}</label>
      <input {...inputProps} 
        onChange={onChange} 
        onBlur={handleFocus} 
        onFocus={() => 
          inputProps.name === 'confirmPassword' && setFocused(true)}
        focused={focused.toString()}/>
      <span>{errorMessage}</span>
    </div>
  )
}

export default FormInput