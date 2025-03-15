import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div
      className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Your cart is empty</p>
              <Link
                to="/products"
                className="mt-4 inline-block text-black hover:text-gray-700"
                onClick={onClose}
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 border-b pb-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-500">${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 border rounded-l"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-4 py-1 border-t border-b">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 border rounded-r"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total:</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </div>
            <Link
              to="/checkout"
              className="block w-full bg-black text-white text-center py-3 rounded-full hover:bg-gray-800"
              onClick={onClose}
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer; 