const CustomToast = ({ product }) => {
  return (
    <div className="flex items-center space-x-4 p-4">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-12 h-12 object-cover rounded"
      />
      <div>
        <p className="font-semibold text-white">{product.name}</p>
        <p className="text-sm text-gray-200">Added to cart</p>
      </div>
    </div>
  );
};

export default CustomToast; 