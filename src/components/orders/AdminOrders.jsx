import { useEffect, useState } from 'react'
import { Button, Container, Spinner, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { getAllOrders } from './order.services'

const formatPrice = (value) => new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
}).format(value)

const AdminOrders = () => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getAllOrders(
      data => {
        setOrders(data)
        setIsLoading(false)
      },
      requestError => {
        setError(requestError.message)
        setIsLoading(false)
      }
    )
  }, [])

  if (isLoading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" role="status" />
        <p className="mt-3">Cargando órdenes...</p>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="my-5 text-center">
        <h2>No pudimos cargar las órdenes</h2>
        <p className="text-muted">{error}</p>
      </Container>
    )
  }

  if (orders.length === 0) {
    return (
      <Container className="my-5 text-center">
        <h2>No hay órdenes registradas</h2>
      </Container>
    )
  }

  return (
    <Container className="my-4">
      <h2 className="mb-4">Gestionar órdenes</h2>

      <Table responsive hover className="align-middle">
        <thead>
          <tr>
            <th>Orden</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th className="text-end">Total</th>
            <th className="text-end">Detalle</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{order.user ? `${order.user.firstName} ${order.user.lastName}` : '—'}</td>
              <td>{new Date(order.createdAt || order.date).toLocaleString('es-AR')}</td>
              <td className="text-end">{formatPrice(order.total)}</td>
              <td className="text-end">
                <Button size="sm" onClick={() => navigate(`/orders/${order.id}`)}>
                  Ver ticket
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default AdminOrders
