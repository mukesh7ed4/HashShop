import SocialShare from './SocialShare';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About HASH</h3>
            <p className="text-gray-300">
              Your premier destination for fashion and style. Quality meets comfort in every piece.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="/shipping" className="text-gray-300 hover:text-white">Shipping Info</a></li>
              <li><a href="/returns" className="text-gray-300 hover:text-white">Returns</a></li>
              <li><a href="/size-guide" className="text-gray-300 hover:text-white">Size Guide</a></li>
              <li><a href="/track-order" className="text-gray-300 hover:text-white">Track Order</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/products" className="text-gray-300 hover:text-white">Shop</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white">About Us</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white">Contact</a></li>
              <li><a href="/faq" className="text-gray-300 hover:text-white">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <SocialShare />
            <p className="mt-4 text-gray-300">
              Subscribe to our newsletter for updates and exclusive offers!
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} HASH. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 