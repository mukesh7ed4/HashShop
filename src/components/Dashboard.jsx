const Dashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">My Account</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Recent Orders</h3>
          <OrderTracking />
        </div>
        
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Recently Viewed</h3>
          <RecentlyViewed />
        </div>
        
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Wishlist</h3>
          <WishlistButton />
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 