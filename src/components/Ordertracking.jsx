import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderTracking = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchOrder, setSearchOrder] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // Replace with your API endpoint
      const response = await fetch('/api/orders/user-orders', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setOrders(data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTrackOrder = async (orderId) => {
    try {
      const response = await fetch(`/api/orders/track/${orderId}`);
      const data = await response.json();
      setSelectedOrder(data);
    } catch (error) {
      console.error('Error tracking order:', error);
    }
  };

  const getStatusColor = (status) => {
    const statusColors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'processing': 'bg-blue-100 text-blue-800',
      'shipped': 'bg-purple-100 text-purple-800',
      'delivered': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="mb-6">
              <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No Orders Yet</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't made any purchases yet. Start shopping to track your orders!
            </p>
            <button
              onClick={() => navigate('/shop')}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Track Your Orders</h1>

        {/* Search Order */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="max-w-xl mx-auto">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Enter Order ID"
                value={searchOrder}
                onChange={(e) => setSearchOrder(e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={() => handleTrackOrder(searchOrder)}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Track
              </button>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {orders.map((order) => (
              <div key={order.id} className="p-6">
                <div className="md:flex md:items-center md:justify-between">
                  <div className="md:flex md:items-center">
                    <div className="text-sm text-gray-500">Order ID:</div>
                    <div className="font-medium text-gray-900 ml-2">{order.id}</div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <div className="text-sm text-gray-500">Order Date</div>
                    <div className="mt-1 text-sm font-medium text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Total Amount</div>
                    <div className="mt-1 text-sm font-medium text-gray-900">
                      ${order.totalAmount.toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Shipping Address</div>
                    <div className="mt-1 text-sm font-medium text-gray-900">
                      {order.shippingAddress.city}, {order.shippingAddress.country}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Estimated Delivery</div>
                    <div className="mt-1 text-sm font-medium text-gray-900">
                      {new Date(order.estimatedDelivery).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Order Timeline */}
                {selectedOrder?.id === order.id && (
                  <div className="mt-8">
                    <div className="border-l-2 border-blue-600 ml-4">
                      {order.timeline.map((event, index) => (
                        <div key={index} className="relative pb-8">
                          <div className="absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full border-2 border-blue-600 bg-white"></div>
                          <div className="ml-6">
                            <p className="text-sm font-medium text-gray-900">{event.status}</p>
                            <p className="text-sm text-gray-500">{event.timestamp}</p>
                            <p className="mt-1 text-sm text-gray-600">{event.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => handleTrackOrder(order.id)}
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    {selectedOrder?.id === order.id ? 'Hide Details' : 'View Details'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking; 