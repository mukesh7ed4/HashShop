import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import ProtectRoute from './components/ProtectRoute';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/cart';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { useState } from 'react';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Wishlist from './pages/Wishlist';
import ProductDetails from './pages/ProductDetails';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Shipping from './pages/Shipping';

function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="container mx-auto px-4 py-8 flex-grow">
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                {/* Protected Routes */}
                <Route path="/" element={
                  <ProtectRoute>
                    <Home />
                  </ProtectRoute>
                } />
                <Route path="/products" element={
                  <ProtectRoute>
                    <Products setCartItems={setCartItems} />
                  </ProtectRoute>
                } />
                <Route path="/cart" element={
                  <ProtectRoute>
                    <Cart />
                  </ProtectRoute>
                } />
                <Route path="/profile" element={<Profile />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/shipping" element={<Shipping />} />
               
                    {/* Redirect unknown routes to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
            
            {/* Toast Container */}
            <Toaster
              position="top-center"
              reverseOrder={false}
            />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
