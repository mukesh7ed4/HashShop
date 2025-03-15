import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [total, setTotal] = useState(0);

  // Calculate cart total
  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  // Update total when cart items change
  useEffect(() => {
    setTotal(calculateTotal());
  }, [cartItems]);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link 
            to="/products" 
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2">
          {cartItems.map((item) => (
            <div 
              key={item.id} 
              className="flex items-center border-b py-4 space-x-4"
            >
              <img 
                src={item.img} 
                alt={item.name} 
                className="w-24 h-24 object-cover"
              />
              
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
                
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-1 border rounded"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="mx-4">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 border rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            
            <div className="border-t pt-3">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <Link
            to="/checkout"
            className="block w-full bg-black text-white text-center py-2 rounded-md mt-6 hover:bg-gray-800"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;