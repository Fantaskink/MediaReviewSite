import axiosInstance from '../axios/axiosInstance'

interface LogIn {
    username: string;
    password: string;
}

async function signIn(user: LogIn) {
  try {
    const response = await axiosInstance.post('/api/login', user)
    return response.data
  } catch (error) {
    console.error('Error logging in:', error)
    throw error
  }
}

export { signIn }