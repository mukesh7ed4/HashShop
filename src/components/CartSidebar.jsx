import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const CartSidebar = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div 
        className={`fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-4 flex-1 overflow-y-auto max-h-[calc(100vh-200px)]">
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 border-b pb-4">
                  {/* Product Image */}
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  
                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-500 text-sm">${item.price.toFixed(2)}</p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button 
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button 
                    onClick={() => {
                      removeFromCart(item.id);
                      toast.success('Item removed from cart');
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t p-4 bg-white">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total:</span>
              <span className="font-bold">${calculateTotal().toFixed(2)}</span>
            </div>
            <button 
              className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition-colors"
              onClick={() => {
                // Add checkout logic here
                toast.success('Proceeding to checkout...');
              }}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar; 