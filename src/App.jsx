import './App.css'
import Footer from './components/Footer'
import Hero from './components/Hero'
import CustomNavbar from './components/Navbar'
import Product from './components/ProductsManagement/product/Product'
import AdminProducts from './components/ProductsManagement/adminProducts/AdminProducts'
import { BrowserRouter, Routes, Route } from 'react-router'
import Login from './components/auth/login/Login'
import Protected from './components/protected/Protected'
import NotFound from './components/notFound/NotFound'
import { ToastContainer } from 'react-toastify'
import Register from './components/auth/register/Register'
import ProductForm from './components/ProductsManagement/productForm/ProductForm'
import Users from './components/usersManagement/usersPanel/UsersPanel'

function App() {
  
  return (
    <>
      <ToastContainer></ToastContainer>
      <BrowserRouter>
      <Routes>
      <Route path='login' element={<Login/>}></Route>
      <Route path='register' element={<Register/>}></Route>

      <Route element={<Protected/>}>
        <Route element={<CustomNavbar/>}>
          <Route element={<Footer/>}>

              <Route path='/home' element={<Hero/>}></Route>
              <Route path='/products' element={<Product/>}></Route>
              <Route element={<Protected allowedRoles={['admin', 'superadmin']} />}>
                <Route path='/admin/products' element={<AdminProducts/>}></Route>
                <Route path='admin/products/new-product' element={<ProductForm/>}></Route>
              </Route>
              <Route element={<Protected allowedRoles={['superadmin']} />}>
                <Route path='/superadmin/users' element={<Users/>}></Route>
              </Route>
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
