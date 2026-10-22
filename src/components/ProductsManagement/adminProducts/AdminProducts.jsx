    import Container from 'react-bootstrap/Container';
    import {Table, Badge, Button} from 'react-bootstrap';
    import { useEffect, useState } from 'react';
    import { useLocation, useNavigate } from 'react-router';
    import { getProducts, addProduct, deleteProduct, validateNewProduct, updateProduct } from '../product/product.services.js';
    import { errorToast, successToast } from '../../notifications/Notifications.jsx';
    import ProductForm from '../productForm/ProductForm.jsx'
    import DeleteProductModal from '../deleteProductModal/DeleteProductModal.jsx';
    import { useRef } from 'react';
    import { validateUrl } from '../product/product.services.js';


    const notFoundUrl = 'https://i.pinimg.com/736x/9e/e1/2e/9ee12ef770b840c6653d18db8ebd3330.jpg'

    const Product = () => {
        const location = useLocation()
        const navigate = useNavigate()


    // Productos desde la DB
        const [productsList, setProductsList] = useState([])

        useEffect(() => {
            if (location.pathname === '/admin/products') {
            getProducts(
                data => setProductsList([...data]),
                err => errorToast(err.message)
            )
            }
        }, [location])

        // Interfaz Admin

        // Agregar Producto
        const [productModal, setProductModal] = useState(null)

        const handleShowForm = (value) => {
            setProductModal(value)
        }

        const handleAddProduct = (newProduct) => {
            const image = validateUrl(newProduct.image) ? newProduct.image : notFoundUrl
            
            if(!validateNewProduct(newProduct))
                return

            const newProd = {
                name: newProduct.name,
                price: Number(newProduct.price),
                stock: Number(newProduct.stock),
                image,
                category: newProduct.category
            }
            addProduct(
                newProd,
                () => {
                    successToast(`El producto '${newProduct.name}' ha sido agregado con éxito`)
                    navigate('/admin/products'),
                    handleShowForm(false)
                },
                err => errorToast(err.message)
                )
        }


        // Editar Producto
        const [selectedProduct, setSelectedProduct] = useState(null)
        const modalRef = useRef(null)
        const [isEditing, setIsEditing] = useState(false)

        useEffect(() => {
        if (selectedProduct)
            modalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center'})
        }, [selectedProduct])

        const handleSelectProduct = (product) => {
            setIsEditing(true)
            setSelectedProduct(product)
            handleShowForm(true)
        }
        
        const handleEditProduct = (toChangeProduct) => {
            const image = validateUrl(toChangeProduct.image) ? toChangeProduct.image : notFoundUrl
            if(!validateNewProduct(toChangeProduct))
                return
            const changedProd = {
                id: toChangeProduct.id,
                name: toChangeProduct.name,
                price: toChangeProduct.price,
                stock: toChangeProduct.stock,
                image,
                category: toChangeProduct.category
            }

            updateProduct(
                changedProd,
                () => {
                    successToast(`El producto '${toChangeProduct.name}' ha sido editado con éxito`),
                    navigate('/admin/products'),
                    handleShowForm(false)
                    setIsEditing(false)
                },
                err => {
                    errorToast(err.message)}
            )
            }


        // Eliminar Producto
        const [toDeleteProduct, setToDeleteProduct] = useState(null)

        const handleDeleteProduct = (value) => {
            setToDeleteProduct(value)
        }
        
        const handleConfirmDelete = () => {

            deleteProduct(
                toDeleteProduct.id,
                () => {
                    successToast(`El producto '${toDeleteProduct.name}' ha sido borrado con éxito`)
                    setToDeleteProduct(null)
                    navigate('/admin/products')
                },
                err => errorToast(err.message)
            )
        }


        //
        return (
            <>
            {productModal && <ProductForm key={selectedProduct?.id ?? 'nuevo'} ref={modalRef} onProductAdded={handleAddProduct} onShowForm={handleShowForm} product={selectedProduct} isEditing={isEditing} onProductChanged={handleEditProduct}></ProductForm>}

            <Container className="my-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="mb-0">Administrar productos</h2>
                <Button variant="primary" onClick={() => {setSelectedProduct(null), setIsEditing(false), handleShowForm(true)}}>
                    Nuevo producto
                </Button>
            </div>

            {productsList.length > 0
            ?
            <Table striped hover responsive className="align-middle">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th className="text-end">Precio</th>
                        <th className="text-center">Stock</th>
                        <th className="text-center">Categoria</th>
                        <th className="text-end">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productsList.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td className="text-end">${Number(product.price).toFixed(2)}</td>
                            <td className="text-center">
                                {product.stock > 0
                                ? product.stock
                                : <Badge bg="danger">Agotado</Badge>}
                            </td>
                            <td className="text-center">{product.category}</td>
                            <td className="text-end">
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleSelectProduct(product)}>
                                    Editar
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => handleDeleteProduct(product)}>
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            : <p className="text-center text-muted my-5">No se encontraron productos</p>
            }

            <DeleteProductModal
                show={toDeleteProduct !== null}
                productName={toDeleteProduct?.name}
                onConfirm={handleConfirmDelete}
                onCancel={() => setToDeleteProduct(null)}
            />
        </Container>
        </>
        )
    }

    export default Product