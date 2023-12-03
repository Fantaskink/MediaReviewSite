import axiosInstance from '../axios/axiosInstance'

interface Movie {
    title: string;
    thumbnail_url: string;
    description: string;
    year: number;
    }

interface Book {
    title: string;
    thumbnail_url: string;
    description: string;
    author: string;
}

async function addMovie(movie: Movie) {
  try {
    const response = await axiosInstance.post('/api/admin/addmovie', movie)
    return response.data
  } catch (error) {
    console.error('Error adding movie:', error)
    throw error
  }
}

async function addBook(book: Book) {
  try {
    const response = await axiosInstance.post('/api/admin/addbook', book)
    return response.data
  } catch (error) {
    console.error('Error adding book:', error)
    throw error
  }
}

export { addMovie, addBook }