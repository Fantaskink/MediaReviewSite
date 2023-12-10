import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn } from './SignInAPI'
import { useContext } from 'react'
import { AuthContext } from '../authcontext/AuthContext'
import { AxiosError } from 'axios'

interface User {
    username: string;
    password: string;
}

const SignInPage: React.FC = () => {

  const navigate = useNavigate()

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

  const { setLoggedIn } = useContext(AuthContext)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check if any of the form fields are empty
    if (!formData.username || !formData.password) {
      alert('All fields are required')
      return
    }

    console.log(formData)

    try {
      const response = await signIn(formData)
      if (response.token) {
        setLoggedIn(true)
        navigate('/')
      }
      setFormData({
        username: '',
        password: '',
      })
      //alert('User signed in successfully!')
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null) {
        const axiosError = error as AxiosError<{ error: string }>
        console.error('Error signing in:', axiosError?.response?.data?.error)
        alert(`Error signing in: ${axiosError?.response?.data?.error}`)
      }
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