import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { toast } from 'react-hot-toast';

const Products = () => {
  const [products] = useState([
    {
      id: 1,
      name: "Classic T-Shirt",
      price: 29.99,
      image: "/path-to-image.jpg",
      isNew: true,
      // other product details...
    },
    // more products...
  ]);

  const handleAddToCart = (product) => {
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.image,
      quantity: 1,
      category: product.category,
      description: product.description
    };
    
    addToCart(cartProduct);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Our Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products; 