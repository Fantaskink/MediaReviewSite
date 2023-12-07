import { useState } from 'react'
import { signIn } from './SignInAPI'

interface User {
    username: string;
    password: string;
}

const SignInPage: React.FC = () => {
  const [formData, setFormData] = useState<User>({
    username: '',
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
    if (!formData.username || !formData.password) {
      alert('All fields are required')
      return
    }

    console.log(formData)

    try {
      await signIn(formData)
      setFormData({
        username: '',
        password: '',
      })
      alert('User signed in successfully!')
    } catch (error) {
      console.error('Error signing in:', error)
      
    }
  }

  return (
    <div>
      <h1>Sign In</h1>
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
        <button type="submit" onClick={handleSubmit}>
          Sign In
        </button>
      </form>
    </div>
  )
}

export default SignInPage