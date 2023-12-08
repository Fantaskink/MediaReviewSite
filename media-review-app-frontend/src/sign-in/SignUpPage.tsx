import { useState} from 'react'
import { signUp } from './SignUpAPI'
import FormInput from './FormInput' 
import { AxiosError } from 'axios'
import './SignUpPage.css'

const SignUpPage: React.FC = () => {
  const [values, setValues] = useState({
    username: '',
    email_address: '',
    password: '',
    confirmPassword: '',
  })
  
  const inputs = [
    {
      id: 1,
      name: 'username',
      type: 'text',
      placeholder: 'Username',
      errorMessage: 'Username should be between 3 and 20 characters and shouldn\'t contain special characters',
      label: 'Username',
      pattern: '^[a-zA-Z0-9]{3,20}$',
      required: true,
    },
    {
      id: 2,
      name: 'email_address',
      type: 'email',
      placeholder: 'Email',
      errorMessage: 'A valid email address is required',
      label: 'Email',
      required: true,
    },
    {
      id: 3,
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      errorMessage: 'Password must be at least 8 characters long and contain at least one number',
      label: 'Password',
      pattern: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$',
      required: true,
    },
    {
      id: 4,
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm Password',
      errorMessage: 'Passwords must match',
      label: 'Confirm Password',
      pattern: values.password,
      required: true,
    },

  ]


  const handleSubmit = async (e) => {
    
    e.preventDefault()
    const formData = {
      username: e.target.username.value,
      email_address: e.target.email_address.value,
      password: e.target.password.value,
    }
    // Check if any of the form fields are empty
    if (!formData.username || !formData.email_address || !formData.password) {
      alert('All fields are required')
      return
    }

    console.log(formData)

    try {
      await signUp(formData)
      alert('User signed up successfully!')
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null) {
        const axiosError = error as AxiosError<{ error: string }>
        console.error('Error signing in:', axiosError?.response?.data?.error)
        alert(`Error signing in: ${axiosError?.response?.data?.error}`)
      }
    }
  }

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  console.log(values)
    
  return (
    <div className='sign-up-page'>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <h1>Register account</h1>
        {inputs.map((input) => (
          <FormInput key={input.id} {...input} value={values[input.name]} 
            onChange={onChange}/>
        ))}
        <button className='sign-up-button'>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpPage