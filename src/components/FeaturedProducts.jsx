import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import { products } from '../data/products';

// If you're using placeholder images from an external service, you can use this
const fallbackImage = 'https://via.placeholder.com/400';

const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  // Get only featured products (first 4 products for example)
  const featuredProducts = products.slice(0, 4);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products, crafted with quality and style in mind.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div 
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                  src={product.image || fallbackImage}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={handleImageError}
                />
                {product.badge && (
                  <span className="absolute top-2 right-2 bg-black text-white px-2 py-1 text-sm rounded">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                
                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Products Button */}
        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-block bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts; 