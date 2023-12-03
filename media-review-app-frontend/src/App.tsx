import './App.css'
import { Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import NavigationBar from './navigation/NavigationBar'
import LibraryPage from './library/LibraryPage'
import HomePage from './home/HomePage'
import SignInPage from './sign-in/SignInPage'

function App() {

  return (
    <>
      <NavigationBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="sign-in" element={<SignInPage />} />
      </Routes>
    </>
  )
}

export default App
