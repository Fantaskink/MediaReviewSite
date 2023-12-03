import { useState, useEffect } from 'react'
import { getLibraryCards, getAllLibraryItemsCount } from './LibraryAPI'
import './LibraryPage.css'

interface LibraryItem {
  media_id: number;
  title: string;
  thumbnail_url: string;
}

function LibraryPage() {
  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>([]) // Set initial state as an empty array
  const [itemCount, setItemCount] = useState<number>(0) // Set initial state as 0
  const [pageNumber, setPageNumber] = useState<number>(1) // Set initial state as 1
  

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
    getLibraryCards(pageNumber)
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
      <p>Number of items in library: {itemCount}</p>
      <p>Page {pageNumber} of {Math.ceil(itemCount / 72)}</p>

      <button className='prev-page-button'
        onClick={() => {
          setPageNumber(pageNumber - 1)
        }}
        disabled={pageNumber === 1}
      > 
        Previous page
      </button>

      <button className='next-page-button'
        onClick={() => {
          setPageNumber(pageNumber + 1)
        }}
        disabled={pageNumber === Math.ceil(itemCount / 72)}
      >
        Next page
      </button>

      <div className='grid-container'>
        {libraryItems.map((item) => (
          <div key={item.media_id} className='grid-item'>
            <img
              className='grid-item-image'
              src={item.thumbnail_url}
              alt={item.title}
            />
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default LibraryPage
