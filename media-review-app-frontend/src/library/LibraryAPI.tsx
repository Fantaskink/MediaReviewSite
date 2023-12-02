import axiosInstance from '../axios/axiosInstance'

async function getAllLibraryItems() {
  try {
    const response = await axiosInstance.get('/api/library/getall')
    return response.data
  } catch (error) {
    console.error('Error retrieving library items:', error)
    throw error
  }
}

async function getAllLibraryItemsCount() {
  try {
    const response = await axiosInstance.get('/api/library/getallcount')
    return response.data
  } catch (error) {
    console.error('Error retrieving library items:', error)
    throw error
  }
}

export { getAllLibraryItems, getAllLibraryItemsCount }