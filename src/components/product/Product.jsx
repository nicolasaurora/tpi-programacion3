import Container from 'react-bootstrap/Container';
import {Row, Col} from 'react-bootstrap';
import products from '../data.js'
import ProductItem from './ProductItem.jsx'

const Product = () => {
  return (
    <Container className="my-4">

      <Row>
        {products.map((product) => (
          
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
    </Container>
  )
}

export default Product