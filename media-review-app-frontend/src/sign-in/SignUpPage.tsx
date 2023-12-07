import { useState } from 'react'
import { signUp } from './SignUpAPI'

interface User {
    username: string;
    email_address: string;
    password: string;
}

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState<User>({
    username: '',
    email_address: '',
    password: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    
    e.preventDefault()

    // Check if any of the form fields are empty
    if (!formData.username || !formData.email_address || !formData.password) {
      alert('All fields are required')
      return
    }

    console.log(formData)

    try {
      await signUp(formData)
      setFormData({
        username: '',
        email_address: '',
        password: '',
      })
      alert('User signed up successfully!')
    } catch (error) {
      console.error('Error signing up:', error)
      
    }
  }
    
  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email_address">Email</label>
          <input
            type="text"
            id="email_address"
            name="email_address"
            value={formData.email_address}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleSubmit}>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpPage