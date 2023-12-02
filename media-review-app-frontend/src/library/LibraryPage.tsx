import { useState, useEffect } from 'react'
import { getAllLibraryItems, getAllLibraryItemsCount } from './LibraryAPI'

interface LibraryItem {
  media_id: number;
  title: string;
  description: string;
  type: string;
  year: number;
  rating: number;
  // Add other properties as per your actual data structure
}

function LibraryPage() {
  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>([]) // Set initial state as an empty array
  const [itemCount, setItemCount] = useState<number>(0) // Set initial state as 0

  useEffect(() => {
    // Fetch library items count when the component mounts
    getAllLibraryItemsCount()
      .then((count) => {
        // Update the state with the fetched library items count
        setItemCount(count)
      })
      .catch((error) => {
        console.error('Error fetching library items count:', error)
      })
  }, []) // Empty dependency array ensures the effect runs only once when the component mounts

  useEffect(() => {
    // Fetch library items when the component mounts
    getAllLibraryItems()
      .then((items) => {
        // Update the state with the fetched library items
        setLibraryItems(items)
      })
      .catch((error) => {
        console.error('Error fetching library items:', error)
      })
  }, []) // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div>
      <h1>Library</h1>
      < p>Number of items in library: {itemCount}</p>
      <pre>{JSON.stringify(libraryItems, null, ' ')}</pre>
    </div>
  )
}

export default LibraryPage
