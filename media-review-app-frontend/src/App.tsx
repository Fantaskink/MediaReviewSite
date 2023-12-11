import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthContext } from './authcontext/AuthContext'

import NavigationBar from './navigation/NavigationBar'
import LibraryPage from './library/LibraryPage'
import HomePage from './home/HomePage'
import SignInPage from './sign-in/SignInPage'
import SignUpPage from './sign-in/SignUpPage'
import AdminPage from './libraryadmin/AdminPage'
import AddFilmPage from './libraryadmin/AddFilmPage'
import AddBookPage from './libraryadmin/AddBookPage'
import FilmPage from './library/film/FilmPage'
import ProfilePage from './profile/ProfilePage'

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '')

  useEffect(() => {
    const token = Cookies.get('access_token')
    setLoggedIn(!!token)
  }, [])

  return (
    <>
      <AuthContext.Provider value={{ isLoggedIn, setLoggedIn, userName, setUserName}}>
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
          <Route path="/member/:slug" element={<ProfilePage />} />
        </Routes>
      </AuthContext.Provider>
    </>
  )
}

export default App
