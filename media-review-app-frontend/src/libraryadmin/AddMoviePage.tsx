import React, { useState } from 'react'
import { addMovie } from './AdminAPI'

interface Movie {
  title: string;
  thumbnail_url: string;
  description: string;
  year: number;
}

const AddMoviePage: React.FC = () => {
  const [formData, setFormData] = useState<Movie>({
    title: '',
    thumbnail_url: '',
    description: '',
    year: 0,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addMovie(formData)
      setFormData({
        title: '',
        thumbnail_url: '',
        description: '',
        year: 0,
      })
      alert('Movie added successfully!')
    } catch (error) {
      console.error('Error adding movie:', error)
      // Handle error state or show an error message
    }
  }

  return (
    <div>
      <h2>Add Movie</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="thumbnail_url">Thumbnail URL</label>
          <input
            type="text"
            id="thumbnail_url"
            name="thumbnail_url"
            value={formData.thumbnail_url}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="year">Year</label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Add Movie</button>
      </form>
    </div>
  )
}

export default AddMoviePage
