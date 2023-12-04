import React, { useState } from 'react'
import { addFilm } from './AdminAPI'

interface Film {
  title: string;
  thumbnail_url: string;
  description: string;
  director: string;
  year: number;
}

const AddFilmPage: React.FC = () => {
  const [formData, setFormData] = useState<Film>({
    title: '',
    thumbnail_url: '',
    description: '',
    director: '',
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
      await addFilm(formData)
      setFormData({
        title: '',
        thumbnail_url: '',
        description: '',
        director: '',
        year: 0,
      })
      alert('Film added successfully!')
    } catch (error) {
      console.error('Error adding film:', error)
      // Handle error state or show an error message
    }
  }

  return (
    <div>
      <h2>Add Film</h2>
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
          <label htmlFor="director">Director</label>
          <input
            type="text"
            id="director"
            name="director"
            value={formData.director}
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
        <button type="submit">Add Film</button>
      </form>
    </div>
  )
}

export default AddFilmPage
