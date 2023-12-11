import { useParams } from 'react-router-dom'
import { getUserData } from './ProfileAPI'
import { useEffect, useState } from 'react'

interface User {
    username: string;
    email: string;
}

function ProfilePage() {
  const { slug } = useParams<{ slug: string}>()

  const [user, setUser] = useState<User | undefined>(undefined)
  const [loading, setLoading] = useState(true)
    
  useEffect(() => {
    if (slug) {
      getUserData(slug)
        .then((data) => {
          setUser(data)
          setLoading(false)
        })
        .catch((error) => {
          console.error('Error fetching user data:', error.message)
        })
    }
  }
  , [slug])

  if (loading) {
    return <p>Loading...</p>
  }
    
  return (
    <div>
      <h1>{user?.username}</h1>
      <p>{user?.email}</p>
    </div>
  )
}

export default ProfilePage