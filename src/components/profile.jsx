export default function ProfilePage({ user, onClose }) {
    return (
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative">
  
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
  
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-md"
            />
  
            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              {user.displayName}
            </h2>
  
            <p className="text-gray-500">{user.email}</p>
          </div>
  
          {/* Info Section */}
          <div className="mt-8 space-y-4 text-sm">
            <InfoRow label="User ID" value={user.uid} />
            <InfoRow label="Provider" value="Google" />
            <InfoRow
              label="Account Created"
              value={new Date(user.metadata.creationTime).toLocaleDateString()}
            />
            <InfoRow
              label="Last Login"
              value={new Date(user.metadata.lastSignInTime).toLocaleDateString()}
            />
          </div>
  
        </div>
      </div>
    )
  }
  
  function InfoRow({ label, value }) {
    return (
      <div className="flex justify-between bg-gray-100 rounded-xl px-4 py-3">
        <span className="text-gray-500">{label}</span>
        <span className="font-medium text-gray-800 truncate max-w-[160px]">
          {value}
        </span>
      </div>
    )
  }
  