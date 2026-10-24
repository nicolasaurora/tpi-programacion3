import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import { AuthenticationContext } from './services/auth.context';

const CustomNavbar = () => {
  const navigate = useNavigate()
  const { role } = useContext(AuthenticationContext)
  const [isCompact, setIsCompact] = useState(false)

  useEffect(() => {
    const updateNavbar = () => setIsCompact(window.scrollY > 40)

    updateNavbar()
    window.addEventListener('scroll', updateNavbar)

    return () => window.removeEventListener('scroll', updateNavbar)
  }, [])

  const handleNavHome = () => {
    navigate('home') // Tapa el tema del focus en los links
  }

  const handleNavProducts = () => {
    navigate('products') // Tapa el tema del focus en los links
  }

  const handleNavAdminProducts = () => {
    navigate('admin/products')
  }

  const handleNavAboutUs = () => {
    navigate('aboutus') // Tapa el tema del focus en los links
  }

  const handleNavUsers = () => {
    navigate('superadmin/users') // Tapa el tema del focus en los links
  }

  const { handleUserLogout } =useContext(AuthenticationContext)

  const handleLogout = () => {
    handleUserLogout()
    navigate('/login')
  }

  return (
    <>
    <Navbar
      data-bs-theme="dark"
      fixed="top"
      className={`site-navbar ${isCompact ? 'site-navbar--compact' : ''}`}
    >
        <Container fluid className="px-0">
          <Nav className="w-100 justify-content-center gap-4">
            <Nav.Link onClick={handleNavHome}>Inicio</Nav.Link>
            {
              role !== 'admin' && <Nav.Link onClick={handleNavProducts}>Productos</Nav.Link>
            }
            {
              role !== 'user' && <Nav.Link onClick={handleNavAdminProducts}>Gestionar Productos</Nav.Link>
            }
            {
              role === 'superadmin' && <Nav.Link onClick={handleNavUsers}>Gestionar Usuarios</Nav.Link>
            }
            <Nav.Link onClick={handleNavAboutUs}>Sobre nosotros</Nav.Link>
            <Nav.Link onClick={handleLogout}>Cerrar Sesion</Nav.Link>
          </Nav>
        </Container>
    </Navbar>
    <div className={`site-navbar-content ${isCompact ? 'site-navbar-content--compact' : ''}`}>
      <Outlet/>
    </div>
    </>
  )
}

export default CustomNavbar