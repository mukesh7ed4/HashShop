export default function QuickViewModal({ product, onClose }) {
    if (!product) return null
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
          <div className="flex justify-end p-4">
            <button onClick={onClose} className="text-gray-500 hover:text-black">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</div>
              <button
                onClick={() => {
                  // Add to cart logic
                  onClose()
                }}
                className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  } 