import { useState } from 'react';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [orders] = useState([]); // Replace with actual orders data

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <div className="mb-4">
            <svg 
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">No Orders Yet</h2>
          <p className="text-gray-600 mb-4">
            Looks like you haven't placed any orders yet.
          </p>
          <Link 
            to="/products" 
            className="inline-block bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">Order #{order.id}</p>
                <p className="text-gray-600">{order.date}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${order.total}</p>
                <p className="text-sm text-gray-600">{order.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders; 