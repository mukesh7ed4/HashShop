import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { useCart } from '../context/CartContext'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import FeaturedProducts from '../components/FeaturedProducts'
import toast from 'react-hot-toast'

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [newArrivals, setNewArrivals] = useState([
    { id: 'p1', img: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS2880-02-M21.jpg?v=1712734714&width=600', name: 'Obsidian Jet Black Straight Fit Jeans', price: '1399', category: 'Jeans' },
    { id: 'p2', img: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS2720-19-M1.jpg?v=1711009145&width=600', name: 'Coastal Linen Khaki Shirt', price: '1299', category: 'Shirts' },
    { id: 'p3', img: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS2889-02-M2.jpg?v=1713437963&width=600', name: 'Obsidian Jet Black Straight Fit Jeans', price: '1199', category: 'Jeans' },
    { id: 'p4', img: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS2881-02-M2.jpg?v=1713173993&width=600', name: 'Obsidian Washed Black Straight Fit Jeans', price: '1899', category: 'Jeans' }
  ])
  const [loading, setLoading] = useState({ featured: true, newArrivals: false })
  const [error, setError] = useState({ featured: null, newArrivals: null })
  const { addToCart, showNotification } = useCart()
  const navigate = useNavigate()

  // All products data for expanded view
  const allProducts = [
    { id: 'p1', img: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS2880-02-M21.jpg?v=1712734714&width=600', name: 'Obsidian Jet Black Straight Fit Jeans', price: '1399', category: 'Jeans' },
    { id: 'p2', img: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS2720-19-M1.jpg?v=1711009145&width=600', name: 'Coastal Linen Khaki Shirt', price: '1299', category: 'Shirts' },
    { id: 'p3', img: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS2889-02-M2.jpg?v=1713437963&width=600', name: 'Obsidian Jet Black Straight Fit Jeans', price: '1199', category: 'Jeans' },
    { id: 'p4', img: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS2881-02-M2.jpg?v=1713173993&width=600', name: 'Obsidian Washed Black Straight Fit Jeans', price: '1899', category: 'Jeans' },
    { id: 'p5', img: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS2747-04-M1.jpg?v=1708500756&width=600', name: 'Obsidian Jet Black Straight Fit Jeans', price: '1399', category: 'Jeans' },
    { id: 'p6', img: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS2847-04-M21.jpg?v=1708435447&width=600', name: 'Coastal Linen Khaki Shirt', price: '1299', category: 'Shirts' },
    { id: 'p7', img: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS2844-03-M1.jpg?v=1707995301&width=600', name: 'Obsidian Jet Black Straight Fit Jeans', price: '1199', category: 'Jeans' },
    { id: 'p8', img: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS2539-02-M242.jpg?v=1700502105&width=600', name: 'Obsidian Washed Black Straight Fit Jeans', price: '1899', category: 'Jeans' },  
    { id: 'p9', img: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS2369-04-M56.jpg?v=1697480656&width=600', name: 'Obsidian Jet Black Straight Fit Jeans', price: '1399', category: 'Jeans' },
    { id: 'p10', img: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS2735-01-M28.jpg?v=1712742926&width=600', name: 'Coastal Linen Khaki Shirt', price: '1299', category: 'Shirts' },
    { id: 'p11', img: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS2885-02-M1.jpg?v=1712755535&width=600', name: 'Obsidian Jet Black Straight Fit Jeans', price: '1199', category: 'Jeans' },
    { id: 'p12', img: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS2880-02-M21.jpg?v=1712734714&width=600', name: 'Obsidian Washed Black Straight Fit Jeans', price: '1899', category: 'Jeans' },
    { id: 'p13', img: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS2884-02-M2.jpg?v=1712731704&width=600', name: 'Obsidian Jet Black Straight Fit Jeans', price: '1399', category: 'Jeans' },
    { id: 'p14', img: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS2735-04-M34.jpg?v=1712755485&width=600', name: 'Coastal Linen Khaki Shirt', price: '1299', category: 'Shirts' },
    { id: 'p15', img: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/products/Snitch_sep21_0079-2.jpg?v=1709019191&width=600', name: 'Obsidian Jet Black Straight Fit Jeans', price: '1199', category: 'Jeans' },
    { id: 'p16', img: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSO4522-01-324.jpg?v=1697031687&width=600', name: 'Obsidian Washed Black Straight Fit Jeans', price: '1899', category: 'Jeans' },
  ]

  useEffect(() => {
    fetchFeaturedProducts()
    // No need to call fetchNewArrivals as we're using static data
  }, [])

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products?limit=8')
      const data = await response.json()
      
      const transformedData = data.map(item => ({
        id: item.id,
        name: item.title,
        price: item.price,
        image: item.image,
        category: item.category,
        description: item.description.substring(0, 100) + '...',
        rating: item.rating.rate,
        reviews: item.rating.count
      }))

      setFeaturedProducts(transformedData)
      setLoading(prev => ({ ...prev, featured: false }))
    } catch (err) {
      setError(prev => ({ ...prev, featured: 'Failed to fetch featured products' }))
      setLoading(prev => ({ ...prev, featured: false }))
    }
  }

  // Load more products function
  const loadMoreProducts = () => {
    // Get next set of products (4 more products)
    const currentCount = newArrivals.length
    const nextProducts = allProducts.slice(currentCount, currentCount + 4)
    
    if (nextProducts.length > 0) {
      setNewArrivals(prev => [...prev, ...nextProducts])
    }
  }

  const categories = [
    {
      id: 1,
      name: 'T-Shirts',
      image: '/tshirt.webp',
      slug: 't-shirts',
      description: 'Premium quality t-shirts'
    },
    {
      id: 2,
      name: 'Hoodies',
      image: '/hoodie.webp',
      slug: 'hoodies',
      description: 'Comfortable hoodies'
    },
    {
      id: 3,
      name: 'Accessories',
      image: '/Accessories.webp',
      slug: 'accessories',
      description: 'Stylish accessories'
    }
  ]

  const fallbackImage = 'https://via.placeholder.com/400'

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: parseFloat(product.price.replace('Rs ', '')),
      image: product.img,
      category: product.category || 'Fashion',
      description: product.description || `${product.name} - premium quality fashion item`,
    }
    
    addToCart(cartProduct)
    toast.success(`${product.name} added to cart!`)
  }

  // Loading state
  if (loading.featured) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
      </div>
    )
  }

  // Error state
  if (error.featured) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-center">
          <h3 className="text-xl font-bold mb-2">Error</h3>
          <p>{error.featured}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] rounded-md bg-black">
        <div className="absolute inset-0 rounded-md overflow-hidden">
          <img
            src="/hash.webp" // You'll need to add your hero image
            alt="Hero"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Welcome to HASH
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Discover our exclusive collection of premium fashion that defines your style
              </p>
              <Link
                to="/products"
                className="inline-flex items-center bg-white text-black px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
              >
                Shop Now
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.slug}`}
              className="relative group block aspect-square overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Background Image */}
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <h3 className="text-white text-3xl font-bold mb-2 transform transition-transform duration-300 group-hover:scale-110">
                  {category.name}
                </h3>
                <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {category.description}
                </p>
                <span className="mt-4 inline-block px-4 py-2 border-2 border-white text-white text-sm font-semibold rounded-full opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Shop Now
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-out">
          Item added to cart!
        </div>
      )}

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Updated New Arrivals Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">New Arrivals</h2>
            <Link 
              to="/products" 
              className="text-black hover:text-gray-700 flex items-center"
            >
              View Collection
              <svg 
                className="w-5 h-5 ml-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={product.img || fallbackImage}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = fallbackImage;
                    }}
                  />
                  {product.badge && (
                    <span className="absolute top-2 right-2 bg-black text-white px-2 py-1 text-sm rounded">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                  <h3 className="text-lg font-semibold mb-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  {/* Price and Add to Cart */}
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">
                      ₹{parseFloat(product.price.replace('Rs ', '')).toLocaleString('en-IN')}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(e, product);
                      }}
                      className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Subscribe to receive updates about new collections, special offers, and style inspiration.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-full text-black focus:outline-none"
            />
            <button
              type="submit"
              className="bg-white text-black px-8 py-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

const API_URL = 'https://dummyjson.com/products'

export default Home