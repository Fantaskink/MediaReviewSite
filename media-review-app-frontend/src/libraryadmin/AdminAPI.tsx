import axiosInstance from '../axios/axiosInstance'

interface Film {
    title: string;
    thumbnail_url: string;
    description: string;
    year: number;
    director: string;
    }

interface Book {
    title: string;
    thumbnail_url: string;
    description: string;
    author: string;
}

async function addFilm(film: Film) {
  try {
    const response = await axiosInstance.post('/api/admin/addfilm', film)
    return response.data
  } catch (error) {
    console.error('Error adding film:', error)
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

export { addFilm, addBook }