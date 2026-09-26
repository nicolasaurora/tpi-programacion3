import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/images/ph-completo-fondo-blanco.png';

const Nabvar = () => {
  return (
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
            <Nav.Link href="#home">Inicio</Nav.Link>
            <Nav.Link href="#products">Productos</Nav.Link>
            <Nav.Link href="#about">Sobre nosotros</Nav.Link>
          </Nav>
        </Container>
    </Navbar>
  )
}

export default Nabvar
