import { getFilmData } from './FilmAPI'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './FilmPage.css'

interface Film {
  media_id: number;
  slug: string;
  title: string;
  director: string;
  thumbnail_url: string;
  description: string;
  type: string;
  year: number;
  rating: number;
}

function FilmPage() {
  // The film id from the route path `/film/:slug`
  const { slug } = useParams<{ slug: string}>()

  const [film, setFilm] = useState<Film | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slug) {
    // Fetch the film data from the API
      getFilmData(slug)
        .then((data) => {
        // Update the state with the fetched film data
          setFilm(data[0])
          setLoading(false)
        })
        .catch((error) => {
          console.error('Error fetching film data:', error)
        })
    }
  }, [slug]) // Empty dependency array ensures the effect runs only once when the component mounts
  

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>{film?.title}</h1>
      <img className='film-thumbnail' src={film?.thumbnail_url} alt={film?.title} />
      <p>{film?.director}</p>
      <p>{film?.description}</p>
      <p>{film?.year}</p>
      <p>Rating: {film?.rating}</p>
    </div>
  )
}

export default FilmPage