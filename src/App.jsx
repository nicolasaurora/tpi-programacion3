import './App.css'
import Footer from './components/Footer'
import Hero from './components/Hero'
import CustomNavbar from './components/Navbar'
import Product from './components/product/Product'
import { BrowserRouter, Routes, Route } from 'react-router'
import { useState } from 'react'
import Login from './components/auth/login/Login'
import Protected from './components/protected/Protected'
import NotFound from './components/notFound/NotFound'

function App() {
  
  const [loggedIn, setLoggedIn] = useState(false)

  const handleLogin = () => {
    setLoggedIn(true)
  }

  const handleLogout = () => {
    setLoggedIn(null)
  }


  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path='login' element={<Login onLogin={handleLogin}/>}></Route>

      <Route element={<Protected isSignedIn={loggedIn}/>}>
        <Route element={<CustomNavbar onLogout={handleLogout}/>}>
          <Route element={<Footer/>}>

              <Route path='/home' element={<Hero/>}></Route>
              <Route path='/products' element={<Product/>}></Route>
          </Route> {/* Fin del Footer, abarca todas las páginas para que aparezca siempre */}
        </Route> {/* Fin del Navbar, abarca todas las páginas para que aparezca siempre */}

      </Route>

    <Route path='*' element={<NotFound/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
