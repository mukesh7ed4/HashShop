import { Link } from 'react-router-dom'
import { ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { cartItems } = useCart()
  
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  // Add state for mobile menu
  const [isOpen, setIsOpen] = useState(false);

  // Add toggle function
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    if (logout) {
      logout()
    }
    setIsDropdownOpen(false)
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold">HASH</Link>
          </div>

          {/* Hamburger button - visible on mobile */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative hover:text-gray-300">
              <ShoppingCartIcon className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`h-6 w-6 ${isOpen ? 'hidden' : 'block'}`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`h-6 w-6 ${isOpen ? 'block' : 'hidden'}`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <Link to="/products" className="hover:text-gray-300">Products</Link>
            <Link to="/cart" className="relative hover:text-gray-300">
              <ShoppingCartIcon className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            
            {/* User dropdown */}
            <div className="relative">
              <button
                className="flex items-center space-x-2 hover:text-gray-300 focus:outline-none"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <UserCircleIcon className="h-6 w-6" />
                <span>{user ? user.name : 'Guest'}</span>
              </button>

              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {user ? (
                    <>
                      <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        Signed in as<br />
                        <span className="font-medium">{user.email}</span>
                      </div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Your Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Your Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Sign in
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Home Section */}
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              Home
            </Link>

            {/* Shop Section */}
            <div className="space-y-1">
              <div className="px-3 py-2 text-base font-medium text-gray-900">Shop</div>
              <Link 
                to="/products" 
                className="block px-6 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                All Products
              </Link>
              <Link 
                to="/products?category=new" 
                className="block px-6 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                New Arrivals
              </Link>
              <Link 
                to="/products?category=featured" 
                className="block px-6 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Featured
              </Link>
              <Link 
                to="/products?category=sale" 
                className="block px-6 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Sale
              </Link>
            </div>

            {/* Categories Section */}
            <div className="space-y-1">
              <div className="px-3 py-2 text-base font-medium text-gray-900">Categories</div>
              <Link 
                to="/products?category=men's clothing" 
                className="block px-6 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Men's Wear
              </Link>
              <Link 
                to="/products?category=women's clothing" 
                className="block px-6 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Women's Wear
              </Link>
              <Link 
                to="/products?category=jewelery" 
                className="block px-6 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Accessories
              </Link>
            </div>

            {/* Account Section */}
            <div className="space-y-1">
              <div className="px-3 py-2 text-base font-medium text-gray-900">Account</div>
              {user ? (
                <>
                  <Link 
                    to="/profile" 
                    className="block px-6 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link 
                    to="/orders" 
                    className="block px-6 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    My Orders
                  </Link>
                  <Link 
                    to="/wishlist" 
                    className="block px-6 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Wishlist
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="block px-6 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/register" 
                    className="block px-6 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Help & Support */}
            <div className="space-y-1">
              <div className="px-3 py-2 text-base font-medium text-gray-900">Help & Support</div>
              <Link 
                to="/contact" 
                className="block px-6 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </Link>
              <Link 
                to="/faq" 
                className="block px-6 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </Link>
              <Link 
                to="/shipping" 
                className="block px-6 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Shipping Info
              </Link>
            </div>

            {/* Logout Button */}
            {user && (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);  // Also close menu when logging out
                }}
                className="w-full mt-4 px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center"
              >
                <svg 
                  className="w-5 h-5 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                  />
                </svg>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}