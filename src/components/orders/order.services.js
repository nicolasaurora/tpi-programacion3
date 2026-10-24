import { BASE_URL, TOKEN_KEY } from '../services/config'

const getErrorMessage = async (response, fallbackMessage) => {
  try {
    const errorData = await response.json()
    return errorData.message || fallbackMessage
  } catch {
    return fallbackMessage
  }
}

export const createOrder = (cartItems, onSuccess, onError) => {
  const items = cartItems.map(item => ({
    productId: item.id,
    quantity: item.quantity,
  }))

  fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ items }),
  })
    .then(async response => {
      if (!response.ok) {
        throw new Error(await getErrorMessage(response, 'No se pudo confirmar la compra.'))
      }

      return response.json()
    })
    .then(onSuccess)
    .catch(onError)
}

export const getOrder = (orderId, onSuccess, onError) => {
  fetch(`${BASE_URL}/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
    },
  })
    .then(async response => {
      if (!response.ok) {
        throw new Error(await getErrorMessage(response, 'No se pudo cargar la orden.'))
      }

      return response.json()
    })
    .then(onSuccess)
    .catch(onError)
}

export const getMyOrders = (onSuccess, onError) => {
  fetch(`${BASE_URL}/orders/my-orders`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
    },
  })
    .then(async response => {
      if (!response.ok) {
        throw new Error(await getErrorMessage(response, 'No se pudo cargar el historial de compras.'))
      }

      return response.json()
    })
    .then(onSuccess)
    .catch(onError)
}

export const getAllOrders = (onSuccess, onError) => {
  fetch(`${BASE_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
    },
  })
    .then(async response => {
      if (!response.ok) {
        throw new Error(await getErrorMessage(response, 'No se pudieron cargar las órdenes.'))
      }

      return response.json()
    })
    .then(onSuccess)
    .catch(onError)
}
