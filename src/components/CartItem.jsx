export default function CartItem({ item, setCartItems }) {
    const removeFromCart = () => {
      setCartItems(prevItems => prevItems.filter(cartItem => cartItem.id !== item.id))
    }
  
    return (
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center space-x-4">
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 object-cover rounded"
          />
          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-gray-600">${item.price}</p>
          </div>
        </div>
        <button
          onClick={removeFromCart}
          className="text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      </div>
    )
  } 