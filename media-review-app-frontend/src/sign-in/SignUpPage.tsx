import React, { useState } from 'react'
import { signUp } from './SignUpAPI'

interface User {
    username: string;
    password: string;
    email: string;
}

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState<User>({
    username: '',
    password: '',
    email: '',
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
    try {
      await signUp(formData)
      setFormData({
        username: '',
        password: '',
        email: '',
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleSubmit}>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpPage