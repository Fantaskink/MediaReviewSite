import './App.css'
import { Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import NavigationBar from './navigation/NavigationBar'
import LibraryPage from './library/LibraryPage'
import HomePage from './home/HomePage'
import SignInPage from './sign-in/SignInPage'
import AdminPage from './libraryadmin/AdminPage'
import AddBookPage from './libraryadmin/AddBookPage'
import AddMoviePage from './libraryadmin/AddMoviePage'
import FilmPage from './library/movie/MoviePage'

function App() {

  return (
    <>
      <NavigationBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/movie/:id" element={<FilmPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/addbookpage" element={<AddBookPage />} />
        <Route path="/admin/addmoviepage" element={<AddMoviePage />} />
      </Routes>
    </>
  )
}

export default App
