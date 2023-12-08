import './App.css'
import { Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import NavigationBar from './navigation/NavigationBar'
import LibraryPage from './library/LibraryPage'
import HomePage from './home/HomePage'
import SignInPage from './sign-in/SignInPage'
import SignUpPage from './sign-in/SignUpPage'
import AdminPage from './libraryadmin/AdminPage'
import AddFilmPage from './libraryadmin/AddFilmPage'
import AddBookPage from './libraryadmin/AddBookPage'
import FilmPage from './library/film/FilmPage'

function App() {

  return (
    <>
      <NavigationBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/film/:slug" element={<FilmPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/addbookpage" element={<AddBookPage />} />
        <Route path="/admin/addfilmpage" element={<AddFilmPage />} />
      </Routes>
    </>
  )
}

export default App
