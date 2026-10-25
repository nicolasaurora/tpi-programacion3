import { Button, Card, Col, Form, Row, Container, InputGroup } from "react-bootstrap";
import { useState } from "react"
import { useNavigate } from "react-router";



const ProductForm = ({ ref, product, onProductAdded, onShowForm, isEditing, onProductChanged }) => {

    const navigate = useNavigate()
    
    const id = product ? product.id : '';
    const [name, setName] = useState(product ? product.name : '');
    const [price, setPrice] = useState(product ? product.price : 0);
    const [image, setImage] = useState(product ? product.image : '');
    const [stock, setStock] = useState(product ? product.stock : 0);
    const [category, setCategory] = useState(product ? product.category : '');


    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleChangePrice = (e) => {
        setPrice(e.target.value)
    }

    const handleChangeImage = (e) => {
        setImage(e.target.value)
    }

    const handleChangeStock = (e) => {
        setStock(e.target.value)
    }

    const handleChangeCategory = (e) => {
        setCategory(e.target.value)
    }

    const backToProducts = () => {
        navigate('/admin/products')
    }

    // Agregar Producto


    const handleAddProduct = (e) => {
        e.preventDefault()

        const productData = {
            name,
            price: parseInt(price, 10),
            stock: parseInt(stock, 10),
            image,
            category
        }

        onProductAdded(productData)

        setName('')
        setPrice(0)
        setImage('')
        setStock(0)
        setCategory('')


        backToProducts()
    }



    const handleEditProduct = (e) => {
        e.preventDefault()

        const productData = {
            id,
            name,
            price: parseInt(price, 10),
            stock: parseInt(stock, 10),
            image,
            category
        }

        onProductChanged(productData)

        backToProducts()
    }

    return (
        <Container className="my-4 d-flex justify-content-center">
            <Card ref={ref} className="shadow border-0 p-3 px-md-4 w-100" style={{ maxWidth: '560px' }}>
                <Card.Body>
                    <h5 className="login-title mb-1">{isEditing ? 'Edicion de Producto' : 'Nuevo Producto'}</h5>
                    <p className="text-muted small mb-4">Completá los datos para agregarlo a la tienda.</p>

                    <Form onSubmit={isEditing ? handleEditProduct : handleAddProduct} noValidate>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ej: Procesador AMD Ryzen 7 7800X3D"
                                value={name}
                                onChange={handleChangeName}
                            />
                            <Form.Control.Feedback type="invalid">
                                Ingresá el nombre del producto.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Row>
                            <Col sm={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Precio</Form.Label>
                                    <InputGroup hasValidation>
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <Form.Control
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            placeholder="0.00"
                                            value={price}
                                            onChange={handleChangePrice}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            El precio debe ser mayor a 0.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col sm={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Stock</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="0"
                                        step="1"
                                        placeholder="0"
                                        value={stock}
                                        onChange={handleChangeStock}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingresá un número entero (0 o más).
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Categoría</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ej: Procesadores"
                                value={category}
                                onChange={handleChangeCategory}
                            />
                            <Form.Control.Feedback type="invalid">
                                Ingresá la categoría del producto.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>URL de la imagen</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                value={image}
                                onChange={handleChangeImage}
                            />
                            <Form.Control.Feedback type="invalid">
                                Ingresá la URL de la imagen.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <div className="d-flex justify-content-end gap-2 mt-2">
                            <Button variant="outline-secondary" onClick={() => onShowForm(false)}>
                                Cancelar
                            </Button>
                            <Button variant="primary" type="submit">
                                {isEditing ? 'Guardar Producto' : 'Agregar Producto'}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default ProductForm;