import { useContext, useEffect, useState } from 'react'
import { Button, Container, Spinner, Table } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router'
import { getOrder } from './order.services'
import { AuthenticationContext } from '../services/auth.context'

const formatPrice = (value) => new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
}).format(value)

const OrderTicket = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { role } = useContext(AuthenticationContext)
  const [order, setOrder] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    getOrder(
      id,
      data => setOrder(data),
      Error => setError(Error.message)
    )
  }, [id])

  if (error) {
    return (
      <Container className="my-5 text-center">
        <h2>No pudimos cargar el ticket</h2>
        <p className="text-muted">{error}</p>
        <Button onClick={() => navigate('/products')}>Volver a productos</Button>
      </Container>
    )
  }

  if (!order) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" role="status" />
        <p className="mt-3">Cargando ticket...</p>
      </Container>
    )
  }

  const details = order.orderDetails || []
  const orderDate = order.createdAt || order.date
  const isAdministrator = role === 'admin' || role === 'superadmin'

  return (
    <Container className="my-4 order-ticket">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h2 className="mb-1">Compra confirmada</h2>
          <p className="mb-0 text-muted">Orden #{order.id}</p>
        </div>
        <p className="mb-0 text-muted">
          {orderDate ? new Date(orderDate).toLocaleString('es-AR') : ''}
        </p>
      </div>

      <Table responsive hover className="align-middle">
        <thead>
          <tr>
            <th>Producto</th>
            <th className="text-center">Cantidad</th>
            <th className="text-end">Precio unitario</th>
            <th className="text-end">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {details.map(detail => (
            <tr key={`${detail.productId}-${detail.id || detail.product?.id}`}>
              <td>
                <div className="d-flex align-items-center gap-3">
                  <img
                    className="cart-product-image"
                    src={detail.product?.image}
                    alt={detail.product?.name || 'Producto'}
                  />
                  <span>{detail.product?.name || 'Producto'}</span>
                </div>
              </td>
              <td className="text-center">{detail.quantity}</td>
              <td className="text-end">{formatPrice(detail.unitPrice)}</td>
              <td className="text-end">{formatPrice(detail.unitPrice * detail.quantity)}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex flex-column align-items-end gap-3">
        <h4 className="mb-0">Total abonado: {formatPrice(order.total)}</h4>
        <div className="d-flex gap-2">
          <Button
            variant="outline-primary"
            onClick={() => navigate(isAdministrator ? '/admin/orders' : '/orders/my-orders')}
          >
            {isAdministrator ? 'Volver a gestionar órdenes' : 'Volver a mis compras'}
          </Button>
          <Button onClick={() => navigate('/products')}>Seguir comprando</Button>
        </div>
      </div>
    </Container>
  )
}

export default OrderTicket
