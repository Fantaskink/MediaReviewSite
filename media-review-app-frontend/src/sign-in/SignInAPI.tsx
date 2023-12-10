import axiosInstance from '../axios/axiosInstance'
import Cookies from 'js-cookie'

interface LogIn {
    username: string;
    password: string;
}

async function signIn(user: LogIn) {
  try {
    const response = await axiosInstance.post('/api/signin', user)
    Cookies.set('access_token', response.data.token, {expires: 30, sameSite: 'Strict', secure: true })
    return response.data
  } catch (error) {
    console.error('Error logging in:', error)
    throw error
  }
}

export { signIn }