import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: "men's clothing", name: 'Men\'s Clothing' },
    { id: "women's clothing", name: 'Women\'s Clothing' },
    { id: 'jewelery', name: 'Accessories' }
  ];
  
  const { addToCart, showNotification } = useCart();
  
  // Fetch products initially
  useEffect(() => {
    fetchProducts();
  }, []);
  
  // Handle filtering and sorting when products, category, or sort option changes
  useEffect(() => {
    if (products.length > 0) {
      let filteredProducts = [...products];
      
      // Apply category filter
      if (selectedCategory !== 'all') {
        filteredProducts = filteredProducts.filter(
          product => product.category === selectedCategory
        );
      }
      
      // Apply sorting
      const sortedProducts = sortProducts(filteredProducts, sortBy);
      setDisplayedProducts(sortedProducts);
    }
  }, [products, selectedCategory, sortBy]);
  
  // Filter products based on search params
  const category = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';
  
  const displayedProductsFiltered = products.filter(product => {
    const matchesCategory = category === 'all' || product.category === category;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };
  
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };
  
  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      // First, fetch local products
      const localProducts = [
        { id: 'p1', img: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS2880-02-M21.jpg?v=1712734714&width=600', name: 'Obsidian Jet Black Straight Fit Jeans', price: '1399', category: 'Jeans' },
        { id: 'p2', img: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS2720-19-M1.jpg?v=1711009145&width=600', name: 'Coastal Linen Khaki Shirt', price: '1299', category: 'Shirts' },
        // Add more local products as needed
      ];
      
      // Then, fetch API products
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const apiProducts = await response.json();
      
      // Transform API products to match our format
      const transformedApiProducts = apiProducts.map(product => ({
        id: product.id.toString(), // Ensure ID is a string
        name: product.title,
        price: product.price,
        img: product.image,
        category: product.category,
        description: product.description,
        rating: product.rating.rate,
        reviews: product.rating.count
      }));
      
      // Combine local and API products
      const allProducts = [...localProducts, ...transformedApiProducts];
      setProducts(allProducts);
      setDisplayedProducts(allProducts);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
      setLoading(false);
    }
  };
  
  const sortProducts = (products, sortOption) => {
    const sortedProducts = [...products];
    
    switch (sortOption) {
      case 'price-low-high':
        return sortedProducts.sort((a, b) => {
          const priceA = typeof a.price === 'string' ? parseFloat(a.price) : a.price;
          const priceB = typeof b.price === 'string' ? parseFloat(b.price) : b.price;
          return priceA - priceB;
        });
      case 'price-high-low':
        return sortedProducts.sort((a, b) => {
          const priceA = typeof a.price === 'string' ? parseFloat(a.price) : a.price;
          const priceB = typeof b.price === 'string' ? parseFloat(b.price) : b.price;
          return priceB - priceA;
        });
      case 'name-a-z':
        return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-z-a':
        return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return sortedProducts; // 'featured' option returns the default order
    }
  };
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="animate-pulse bg-gray-100 rounded-lg p-4 h-80">
              <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-full mt-4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p className="text-red-500">{error}</p>
        <button 
          onClick={fetchProducts}
          className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Try Again
        </button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      
      {/* Filters and Sorting */}
      <div className="flex flex-col md:flex-row justify-between mb-8">
        <div className="mb-4 md:mb-0">
          <h2 className="font-semibold mb-2">Categories</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-1 rounded-full text-sm ${
                  selectedCategory === category.id
                    ? 'bg-black text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="font-semibold mb-2">Sort By</h2>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="px-4 py-2 border rounded bg-white"
          >
            <option value="featured">Featured</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="name-a-z">Name: A to Z</option>
            <option value="name-z-a">Name: Z to A</option>
          </select>
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300">
            <div 
              onClick={() => handleProductClick(product.id)}
              className="cursor-pointer"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2 hover:text-gray-700 transition">
                  {product.name}
                </h3>
                <p className="text-gray-800 font-bold">
                  {typeof product.price === 'string' && product.price.includes('Rs')
                    ? `₹${parseFloat(product.price.replace('Rs ', ''))}`
                    : `$${parseFloat(product.price).toFixed(2)}`}
                </p>
                
                {/* Display rating if available (for API products) */}
                {product.rating && (
                  <div className="flex items-center mt-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.round(product.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">
                      ({product.reviews || 0})
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="px-4 pb-4">
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* No Products Found */}
      {displayedProducts.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">No Products Found</h2>
          <p className="text-gray-600 mb-6">
            Try adjusting your filter or search criteria.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSortBy('featured');
            }}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}