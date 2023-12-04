import axiosInstance from '../../axios/axiosInstance'

async function getMovieData(movie_url: string) {
  try {
    const response = await axiosInstance.get('/api/movie/getdata/' + movie_url)
    return response.data
  } catch (error) {
    console.error('Error retrieving movie data:', error)
    throw error
  }
}

export { getMovieData }