import { getMovieData } from './MovieAPI'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './MoviePage.css'

interface Movie {
  media_id: number;
  media_url: string;
  title: string;
  director: string;
  thumbnail_url: string;
  description: string;
  type: string;
  year: number;
  rating: number;
}

function MoviePage() {
  // The movie id from the route path `/movie/:id`
  const { id } = useParams<{ id: string}>()

  const [movie, setMovie] = useState<Movie | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch the movie data from the API
    getMovieData(id)
      .then((data) => {
        // Update the state with the fetched movie data
        setMovie(data[0])
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching movie data:', error)
      })
  }, [id]) // Empty dependency array ensures the effect runs only once when the component mounts
  

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>{movie?.title}</h1>
      <img className='movie-thumbnail' src={movie?.thumbnail_url} alt={movie?.title} />
      <p>{movie?.director}</p>
      <p>{movie?.description}</p>
      <p>{movie?.year}</p>
      <p>Rating: {movie?.rating}</p>
    </div>
  )
}

export default MoviePage