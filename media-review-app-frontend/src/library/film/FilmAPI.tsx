import axiosInstance from '../../axios/axiosInstance'

async function getFilmData(slug: string) {
  try {
    const response = await axiosInstance.get('/api/film/getdata/' + slug)
    return response.data
  } catch (error) {
    console.error('Error retrieving movie data:', error)
    throw error
  }
}

export { getFilmData }