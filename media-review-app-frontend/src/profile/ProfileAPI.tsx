import axiosInstance from '../axios/axiosInstance'
import Cookies from 'js-cookie'

async function getUserData(slug: string) {
  const authToken = Cookies.get('access_token')
  const response = await axiosInstance.get(`api/member/${slug}`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  return response.data
}

export { getUserData }