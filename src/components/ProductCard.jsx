import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    setIsAdding(true);
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-4"
        />
        {product.badge && (
          <span className="absolute top-2 right-2 bg-black text-white px-2 py-1 text-sm rounded">
            {product.badge}
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-bold">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className={`px-4 py-2 rounded-full transition-colors ${
              isAdding 
                ? 'bg-green-500 text-white' 
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {isAdding ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
        
        {/* View More button */}
        <Link 
          to={`/product/${product.id}`}
          className="block w-full text-center bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 transition-colors"
        >
          View More
        </Link>
      </div>
    </div>
  );
};

export default ProductCard; 