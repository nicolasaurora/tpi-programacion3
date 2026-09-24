import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ProductItem = ( {product} ) => {
  return (
    <Card className='w-100 h-100'>
      <Card.Img variant="top" src={product.imagen} style={{ height: '220px', objectFit: 'contain' }}/>
      <Card.Body className="d-flex flex-column text-center">
        <Card.Title style={{ minHeight: '48px' }} className='mb-4'>{product.nombre}</Card.Title>
        <Card.Subtitle className='mb-2'>
          Categoria: {product.categoria}
        </Card.Subtitle>
        <Card.Subtitle className='mb-2'>
          Precio: ${product.precio}
        </Card.Subtitle>
        <Button variant="primary" className='w-100 mt-auto'>Comprar</Button>
      </Card.Body>
    </Card>
  )
}

export default ProductItem;