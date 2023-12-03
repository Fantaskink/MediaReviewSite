import axiosInstance from '../axios/axiosInstance'

async function getLibraryCards(pageNumber: number) {
  try {
    const response = await axiosInstance.get('/api/library/getcards/' + pageNumber)
    return response.data
  } catch (error) {
    console.error('Error retrieving library cards:', error)
    throw error
  }
}

/*

async function getAllLibraryItems() {
  try {
    const response = await axiosInstance.get('/api/library/getall')
    return response.data
  } catch (error) {
    console.error('Error retrieving library items:', error)
    throw error
  }
}
*/

async function getAllLibraryItemsCount() {
  try {
    const response = await axiosInstance.get('/api/library/getallcount')
    return response.data
  } catch (error) {
    console.error('Error retrieving library items:', error)
    throw error
  }
}

export { getLibraryCards, getAllLibraryItemsCount }