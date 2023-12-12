import axiosInstance from '../axios/axiosInstance'

async function getMembers(pageNumber: number) {
  try {
    const response = await axiosInstance.get('/api/members/get/' + pageNumber)
    return response.data
  } catch (error) {
    console.error('Error members: ', error)
    throw error
  }
}

async function getMemberCount() {
  try {
    const response = await axiosInstance.get('/api/members/getcount')
    return response.data
  } catch (error) {
    console.error('Error getting member count:', error)
    throw error
  }
}

export { getMembers, getMemberCount }