import axiosInstance from '../axios/axiosInstance'

interface User {
    username: string;
    password: string;
    email: string;
}

async function signUp(user: User) {
  try {
    const response = await axiosInstance.post('/api/signup', user)
    return response.data
  } catch (error) {
    console.error('Error signing up:', error)
    throw error
  }
}

export { signUp }