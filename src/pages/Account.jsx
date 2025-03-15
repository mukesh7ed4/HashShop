import QuickTrackOrder from '../components/QuickTrackOrder';

const Account = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          {/* Account navigation */}
        </div>

        {/* Main content */}
        <div className="md:col-span-2">
          <QuickTrackOrder />
          
          {/* Other account content */}
        </div>
      </div>
    </div>
  );
}; 