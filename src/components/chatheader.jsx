export default function ChatHeader({ user }) {
    if (!user) return null;
  
    return (
      <div className="h-14 md:h-16 bg-white border-b relative px-4 md:px-6 flex items-center justify-between">
        
        {/* LEFT: Name and status */}
        <div className="flex flex-col justify-center">
          <p className="font-semibold text-gray-800 leading-tight">
            {user.displayName || user.name}
          </p>
          <p className="text-xs text-green-500">Active now</p>
        </div>
  
        {/* RIGHT: Avatar */}
        <div className="absolute top-2 right-4 md:top-3 md:right-6">
          <img
            src={user.photoURL}
            alt="avatar"
            className="w-10 h-10 rounded-full border border-gray-200"
          />
        </div>
      </div>
    );
  }
  