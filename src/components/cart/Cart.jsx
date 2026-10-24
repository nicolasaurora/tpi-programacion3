import { useContext, useState } from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { CartContext } from '../services/cart.context'
import { errorToast, successToast } from '../notifications/Notifications'
import { createOrder } from '../orders/order.services'

const formatPrice = (value) => new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
}).format(value)

const Cart = () => {
  const navigate = useNavigate()
  const {
    items,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useContext(CartContext)
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleCheckout = () => {
    setIsCheckingOut(true)

    createOrder(
      items,
      data => {
        clearCart()
        successToast(data.message || 'Compra confirmada correctamente.')
        navigate(`/orders/${data.order.id}`)
      },
      requestError => {
        errorToast(requestError.message)
        setIsCheckingOut(false)
      }
    )
  }

  if (items.length === 0) {
    return (
      <Container className="my-5 text-center">
        <h2>Tu carrito está vacío</h2>
        <p className="text-muted">Agregá productos para continuar con tu compra.</p>
        <Button onClick={() => navigate('/products')}>Ver productos</Button>
      </Container>
    )
  }

  return (
    <Container className="my-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <h2 className="mb-0">Carrito de compras</h2>
        <Button variant="outline-danger" onClick={clearCart}>Vaciar carrito</Button>
      </div>

      <Table responsive hover className="align-middle">
        <thead>
          <tr>
            <th>Producto</th>
            <th className="text-center">Cantidad</th>
            <th className="text-end">Precio unitario</th>
            <th className="text-end">Subtotal</th>
            <th className="text-end">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>
                <div className="d-flex align-items-center gap-3">
                  <img className="cart-product-image" src={item.image} alt={item.name} />
                  <span>{item.name}</span>
                </div>
              </td>
              <td>
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    aria-label={`Quitar una unidad de ${item.name}`}
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    −
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    aria-label={`Agregar una unidad de ${item.name}`}
                    disabled={item.quantity >= item.stock}
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </Button>
                </div>
              </td>
              <td className="text-end">{formatPrice(item.price)}</td>
              <td className="text-end">{formatPrice(item.price * item.quantity)}</td>
              <td className="text-end">
                <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)}>
                  Quitar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex flex-column align-items-end gap-3">
        <h4 className="mb-0">Total: {formatPrice(totalPrice)}</h4>
        <div className="d-flex gap-2">
          <Button variant="outline-primary" onClick={() => navigate('/products')}>
            Seguir comprando
          </Button>
          <Button variant="success" disabled={isCheckingOut} onClick={handleCheckout}>
            {isCheckingOut ? 'Confirmando...' : 'Confirmar compra'}
          </Button>
        </div>
      </div>
    </Container>
  )
}

export default Cart
