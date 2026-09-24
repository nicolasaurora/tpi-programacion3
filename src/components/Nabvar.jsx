import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Nabvar = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container fluid className="position-relative px-0">
          <Navbar.Brand className="ms-3" href="#home">Logo de la marca</Navbar.Brand>
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
