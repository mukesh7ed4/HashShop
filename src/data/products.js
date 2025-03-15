// Import images
import tshirtImage from '../assets/4MSS3955-06_1_632841d3-a37e-47c0-a89a-74b5bccdf1e6.webp';  // Add your actual image paths
import jeansImage from '../assets/4MST2727-02_1_50cfd455-2978-4e3c-91bb-67e264659185.webp';
import dressImage from '../assets/4MST2727-02_1_50cfd455-2978-4e3c-91bb-67e264659185.webp';
import jacketImage from '../assets/4MSS3955-06_1_632841d3-a37e-47c0-a89a-74b5bccdf1e6.webp';
import summerTshirtImage from '../assets/4MSS3955-06_1_632841d3-a37e-47c0-a89a-74b5bccdf1e6.webp'; // Import your image

export const products = [
  {
    id: 1,
    name: "Classic Black T-Shirt",
    price: 29.99,
    description: "Premium cotton t-shirt with perfect fit and comfort.",
    image: "4MSS3955-06_1_632841d3-a37e-47c0-a89a-74b5bccdf1e6.webp",
    images: [tshirtImage, tshirtImage, tshirtImage], // Add more images for product details
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Navy"],
    stock: 15,
    category: "men",
    badge: "New Arrival"
  },
  {
    id: 2,
    name: "Denim Jeans",
    price: 59.99,
    description: "Classic fit denim jeans with premium quality.",
    image: jeansImage,
    images: [jeansImage, jeansImage, jeansImage],
    sizes: ["30", "32", "34", "36"],
    colors: ["Blue", "Black", "Gray"],
    stock: 20,
    category: "men",
    badge: "Best Seller"
  },
  {
    id: 3,
    name: "Summer Dress",
    price: 49.99,
    description: "Lightweight summer dress perfect for any occasion.",
    image: dressImage,
    images: [dressImage, dressImage, dressImage],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Red", "Blue", "White"],
    stock: 12,
    category: "women",
    badge: "Featured"
  },
  {
    id: 4,
    name: "Leather Jacket",
    price: 89.99,
    description: "Classic leather jacket with modern styling.",
    image: jacketImage,
    images: [jacketImage, jacketImage, jacketImage],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Brown"],
    stock: 8,
    category: "men",
    badge: "Premium"
  },
  {
    id: 5, // Different IDs from featured products
    name: "Summer Collection T-Shirt",
    price: 34.99,
    description: "New arrival summer collection t-shirt with unique design.",
    image: summerTshirtImage, // Import your image
    images: [summerTshirtImage, summerTshirtImage, summerTshirtImage],
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black", "Blue"],
    stock: 25,
    category: "New Arrivals",
    badge: "New"
  },
  // Add more products...
];

// Helper function to get product by ID
export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
}; 