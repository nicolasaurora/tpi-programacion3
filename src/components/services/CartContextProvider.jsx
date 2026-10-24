import { useEffect, useState } from 'react'
import { CartContext } from './cart.context'

const CART_KEY = 'tpi-proy-prog-3-cart'

const getSavedCart = () => {
  try {
    const savedCart = JSON.parse(localStorage.getItem(CART_KEY))
    return Array.isArray(savedCart) ? savedCart : []
  } catch {
    return []
  }
}

export const CartContextProvider = ({ children }) => {
  const [items, setItems] = useState(getSavedCart)

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
  }, [items])

  const addToCart = (product) => {
    if (!product?.id || Number(product.stock) <= 0) return

    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id)

      if (existingItem) {
        if (existingItem.quantity >= Number(product.stock)) return currentItems

        return currentItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1, stock: product.stock }
            : item
        )
      }

      return [
        ...currentItems,
        {
          id: product.id,
          name: product.name,
          price: Number(product.price),
          stock: Number(product.stock),
          image: product.image,
          category: product.category,
          quantity: 1,
        },
      ]
    })
  }

  const increaseQuantity = (productId) => {
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === productId && item.quantity < item.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }

  const decreaseQuantity = (productId) => {
    setItems(currentItems =>
      currentItems
        .map(item =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    )
  }

  const removeFromCart = (productId) => {
    setItems(currentItems => currentItems.filter(item => item.id !== productId))
  }

  const clearCart = () => setItems([])

  const totalItems = items.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)

  const value = {
    items,
    totalItems,
    totalPrice,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  }

  return (
    <CartContext value={value}>
      {children}
    </CartContext>
  )
}
