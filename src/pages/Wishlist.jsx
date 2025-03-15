import { useState } from 'react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const [wishlistItems] = useState([]); // Replace with actual wishlist data

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
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
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Your Wishlist is Empty</h2>
          <p className="text-gray-600 mb-4">
            Save items you love to your wishlist and they'll appear here.
          </p>
          <Link 
            to="/products" 
            className="inline-block bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Explore Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistItems.map(item => (
          <div key={item.id} className="bg-white shadow rounded-lg overflow-hidden">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">${item.price}</p>
              <div className="mt-4 space-x-2">
                <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                  Add to Cart
                </button>
                <button className="text-red-600 hover:text-red-800">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist; 