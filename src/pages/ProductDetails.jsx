import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getProductById } from '../data/products';
import toast from 'react-hot-toast';

// Local products array (same as in Home component)
const localProducts = [
  { id: 'p1', img: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS2880-02-M21.jpg?v=1712734714&width=600', name: 'Obsidian Jet Black Straight Fit Jeans', price: '1399', category: 'Jeans' },
  { id: 'p2', img: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSS2720-19-M1.jpg?v=1711009145&width=600', name: 'Coastal Linen Khaki Shirt', price: '1299', category: 'Shirts' },
  // Rest of local products...
];

// Available sizes and colors (default values if not in product)
const defaultSizes = ['S', 'M', 'L', 'XL', 'XXL'];
const defaultColors = ['Black', 'Blue', 'Gray', 'White'];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  // States
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // First check if it's one of our local products (p1, p2, etc.)
        if (id.startsWith('p')) {
          const localProduct = localProducts.find(product => product.id === id);
          
          if (localProduct) {
            // Transform local product to match the expected format
            const transformedProduct = {
              ...localProduct,
              price: parseFloat(localProduct.price),
              images: [localProduct.img], // Create an images array with the main image
              description: localProduct.description || `Premium quality ${localProduct.name}`,
              sizes: localProduct.sizes || defaultSizes,
              colors: localProduct.colors || defaultColors,
              stock: localProduct.stock || 10,
            };
            
            setProduct(transformedProduct);
            setMainImage(transformedProduct.images[0]);
            setLoading(false);
            return;
          }
        }
        
        // If not a local product, try to fetch from API
        // First check if we can get it from the getProductById function
        const apiProduct = getProductById(id);
        
        if (apiProduct) {
          setProduct(apiProduct);
          setMainImage(apiProduct.images[0]);
          setLoading(false);
          return;
        }
        
        // If not found in local function, fetch directly from API
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        
        const data = await response.json();
        
        // Transform API data to match the expected format
        const transformedApiProduct = {
          id: data.id,
          name: data.title,
          price: data.price,
          description: data.description,
          images: [data.image], // API only provides one image
          category: data.category,
          sizes: defaultSizes,
          colors: defaultColors,
          stock: 10, // Default stock value
          rating: data.rating?.rate,
          reviews: data.rating?.count
        };
        
        setProduct(transformedApiProduct);
        setMainImage(transformedApiProduct.images[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        navigate('/products');
        toast.error('Product not found');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <button
            onClick={() => navigate('/products')}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error('Please select size and color');
      return;
    }
    
    addToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity
    });
    toast.success('Added to cart!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <nav className="flex text-gray-500 text-sm">
          <button onClick={() => navigate('/products')} className="hover:text-black">
            Products
          </button>
          <span className="mx-2">/</span>
          <span className="text-black">{product.name}</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img 
              src={mainImage} 
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setMainImage(img)}
                className={`aspect-square rounded-lg overflow-hidden bg-gray-100 ${
                  mainImage === img ? 'ring-2 ring-black' : ''
                }`}
              >
                <img 
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {product.badge && (
            <span className="inline-block bg-black text-white px-3 py-1 rounded-full text-sm">
              {product.badge}
            </span>
          )}
          
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-bold">
            {typeof product.price === 'string' && product.price.includes('Rs') 
              ? `₹${parseFloat(product.price.replace('Rs ', '')).toFixed(2)}`
              : `$${product.price.toFixed(2)}`
            }
          </p>
          <p className="text-gray-600">{product.description}</p>

          {/* Size Selection */}
          <div>
            <h3 className="font-bold mb-2">Select Size</h3>
            <div className="flex gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded ${
                    selectedSize === size 
                      ? 'bg-black text-white' 
                      : 'hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="font-bold mb-2">Select Color</h3>
            <div className="flex gap-2">
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color ? 'border-black' : ''
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="font-bold mb-2">Quantity</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 border rounded-full"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="w-8 h-8 border rounded-full"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-3 rounded ${
              product.stock === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>

          {/* Stock Status */}
          <p className="text-sm text-gray-600">
            {product.stock > 0 
              ? `${product.stock} items in stock` 
              : 'Out of stock'
            }
          </p>

          {/* Display Rating if available (for API products) */}
          {product.rating && (
            <div className="flex items-center mt-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
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
              <span className="text-sm text-gray-500 ml-2">
                ({product.reviews || 0} reviews)
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;