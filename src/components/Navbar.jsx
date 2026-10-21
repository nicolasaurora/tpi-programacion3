import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/images/ph-completo-fondo-blanco.png';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { AuthenticationContext } from './services/auth.context';

const CustomNavbar = () => {
  const navigate = useNavigate()

  const handleNavHome = () => {
    navigate('home') // Tapa el tema del focus en los links
  }

  const handleNavProducts = () => {
    navigate('products') // Tapa el tema del focus en los links
  }

  const handleNavAboutUs = () => {
    navigate('aboutus') // Tapa el tema del focus en los links
  }

  const { handleUserLogout } =useContext(AuthenticationContext)

  const handleLogout = () => {
    handleUserLogout()
    navigate('/login')
  }

  return (
    <>
    <Navbar bg="white" data-bs-theme="white" className='p-auto'>
        <Container fluid className="position-relative px-0">
          <Navbar.Brand className="ms-3" href="#home">
            <img 
              src={logo} 
              alt="Point Hardware"
              width={110}
              height={70} 
            />
          </Navbar.Brand>
          <Nav className="position-absolute start-50 translate-middle-x gap-4">
            <Nav.Link onClick={handleNavHome}>Inicio</Nav.Link>
            <Nav.Link onClick={handleNavProducts}>Productos</Nav.Link>
            <Nav.Link onClick={handleNavAboutUs}>Sobre nosotros</Nav.Link>
            <Nav.Link onClick={handleLogout}>Cerrar Sesion</Nav.Link>
          </Nav>
        </Container>
    </Navbar>
    <Outlet/>
    </>
  )
}

export default CustomNavbar
