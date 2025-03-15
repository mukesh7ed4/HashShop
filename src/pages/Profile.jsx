import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      
      <div className="bg-white shadow rounded-lg p-6 max-w-2xl">
        <div className="space-y-6">
          {/* Profile Picture Section */}
          <div className="flex items-center space-x-4">
            <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-3xl text-gray-600">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <button className="text-blue-600 hover:text-blue-800">
              Change Profile Picture
            </button>
          </div>

          {/* Personal Information */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 text-sm mb-1">Name</label>
                <p className="font-medium">{user?.name}</p>
              </div>
              <div>
                <label className="block text-gray-600 text-sm mb-1">Email</label>
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Default Shipping Address</h2>
            <button className="text-blue-600 hover:text-blue-800">
              + Add Shipping Address
            </button>
          </div>

          {/* Account Settings */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <div className="space-y-3">
              <button className="block text-blue-600 hover:text-blue-800">
                Change Password
              </button>
              <button className="block text-blue-600 hover:text-blue-800">
                Email Preferences
              </button>
              <button className="block text-red-600 hover:text-red-800">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 