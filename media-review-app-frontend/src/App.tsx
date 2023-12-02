import './App.css'
import { Route, Routes } from 'react-router-dom'

import LibraryPage from './library/LibraryPage'
import HomePage from './home/HomePage'

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/library" element={<LibraryPage />} />
    </Routes>
  )
}

export default App
