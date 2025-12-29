export default function ChatHeader({ user }) {
    return (
      <div className="h-16 bg-white border-b flex items-center px-4 gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
          {user.displayName?.[0] || "U"}
        </div>
  
        <div>
          <p className="font-medium">{user.displayName}</p>
          <p className="text-sm text-green-500">
            {user.online ? "Active now" : "Offline"}
          </p>
        </div>
      </div>
    )
  }
  