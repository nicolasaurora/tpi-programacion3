import Container from 'react-bootstrap/Container';
import {Row, Col} from 'react-bootstrap';
import ProductItem from '../productItem/ProductItem.jsx'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getProducts } from './product.services.js';
import { errorToast } from '../../notifications/Notifications.jsx';


const Product = () => {
  const location = useLocation()


  // Productos desde la DB
  const [productsList, setProductsList] = useState([])

  useEffect(() => {
    if (location.pathname === '/products') {
      getProducts(
        data => setProductsList([...data]),
        err => errorToast(err.message)
      )
    }
  }, [location])

  return (
    <Container className="my-4">
      {productsList.length > 0 
      ?
      <Row>
        {productsList.map((product) => (
          
          <Col 
            key={product.id} 
            xs={12}      
            sm={6}      
            md={4}       
            lg={3}       
            className="mb-4 d-flex"> 

              <ProductItem product={product} />
          </Col>
        ))}   
      </Row>
      : <p className="text-center my-5">No se encontraron productos</p>
      }
    </Container>
  )
}

export default Product