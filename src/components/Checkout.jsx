import { useState } from 'react';
import QuickViewModal from './QuickViewModal';
import OrderTracking from './Ordertracking';

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    payment: ''
  });

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="shipping-info">
          {/* Shipping form */}
        </div>
        <div className="order-summary">
          <QuickViewModal />
          <OrderTracking />
        </div>
      </div>
    </div>
  );
};

export default Checkout; 