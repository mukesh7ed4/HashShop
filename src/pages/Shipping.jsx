const Shipping = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shipping Information</h1>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">Shipping Methods</h2>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Standard Shipping:</span> 3-5 business days
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Express Shipping:</span> 1-2 business days
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Shipping Rates</h2>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Standard Shipping:</span> Free for orders over $50
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Express Shipping:</span> $15 flat rate
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Delivery Information</h2>
            <p className="text-gray-600">
              Orders are processed and shipped Monday through Friday, excluding holidays.
              You will receive a confirmation email with tracking information once your order ships.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Shipping; 