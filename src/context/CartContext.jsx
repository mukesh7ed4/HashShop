import { createContext, useContext, useState } from 'react'
import toast from 'react-hot-toast'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItem = prevItems.find(item => item.id === product.id)
      
      if (existingItem) {
        // If exists, increase quantity
        toast.success(`Increased ${product.name} quantity!`)
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      
      // If doesn't exist, add new item with quantity 1
      return [...prevItems, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity 
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)