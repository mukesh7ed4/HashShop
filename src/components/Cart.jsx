import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // Assuming you're storing cart items in localStorage or Redux
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleProceedToPayment = async () => {
    try {
      setIsProcessing(true);
      
      // Validate cart is not empty
      if (cartItems.length === 0) {
        alert('Your cart is empty!');
        return;
      }

      // Create order in your backend
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems,
          totalAmount: calculateTotal(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const { orderId } = await response.json();

      // Navigate to checkout page with order details
      navigate('/checkout', {
        state: {
          orderId,
          totalAmount: calculateTotal(),
          items: cartItems
        }
      });

    } catch (error) {
      console.error('Payment Error:', error);
      alert('There was an error processing your payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cart Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Shopping Cart</h2>
          <span className="text-gray-600">
            ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
          </span>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <div className="mb-4">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
            <button
              onClick={() => navigate('/shop')}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {cartItems.map((item, index) => (
                  <div key={item.id} className={`p-4 sm:p-6 ${
                    index !== cartItems.length - 1 ? 'border-b border-gray-200' : ''
                  }`}>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                      {/* Product Image */}
                      <div className="w-full sm:w-24 h-24 mb-4 sm:mb-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1 sm:ml-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                            <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                          </div>
                          <div className="mt-2 sm:mt-0">
                            <p className="text-lg font-medium text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center border rounded-md">
                            <button
                              className="px-3 py-1 text-gray-600 hover:text-gray-700"
                              onClick={() => {/* handle decrease */}}
                            >
                              -
                            </button>
                            <span className="px-3 py-1 text-gray-600 border-x">
                              {item.quantity}
                            </span>
                            <button
                              className="px-3 py-1 text-gray-600 hover:text-gray-700"
                              onClick={() => {/* handle increase */}}
                            >
                              +
                            </button>
                          </div>
                          <button
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                            onClick={() => {/* handle remove */}}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
                
                {/* Summary Details */}
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">${calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between border-t pt-4">
                    <span className="text-lg font-medium text-gray-900">Total</span>
                    <span className="text-lg font-medium text-gray-900">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleProceedToPayment}
                  disabled={isProcessing}
                  className={`w-full mt-6 px-4 py-3 text-base font-medium rounded-md text-white 
                    ${isProcessing 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                    } transition duration-150 ease-in-out`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    'Proceed to Checkout'
                  )}
                </button>

                {/* Security Badge */}
                <div className="mt-4 flex items-center justify-center text-gray-500 text-sm">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure Checkout
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart; 