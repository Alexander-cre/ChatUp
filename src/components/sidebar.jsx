import { signOut } from "firebase/auth"
import { auth } from "../firebase/config"

export default function Sidebar({
  users,
  selectedUser,
  setSelectedUser,
  sidebarOpen,
  setSidebarOpen
}) {
  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <div
        className={`
          fixed md:static z-40
          h-full w-80 bg-white border-r
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <span className="font-bold text-lg">ChatUp</span>

          <div className="flex items-center gap-3">
            {/* Logout */}
            <button
              onClick={() => signOut(auth)}
              className="text-sm text-red-500 hover:text-red-600"
            >
              Logout
            </button>

            {/* Close button (mobile) */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-gray-500"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Users */}
        <div className="flex-1 overflow-y-auto">
          {users.map(u => (
            <div
              key={u.uid}
              onClick={() => {
                setSelectedUser(u)
                setSidebarOpen(false)
              }}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer
                ${
                  selectedUser?.uid === u.uid
                    ? "bg-gray-200"
                    : "hover:bg-gray-100"
                }
              `}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                  {u.displayName[0]}
                </div>
                {u.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>

              <div>
                <p className="font-medium">{u.displayName}</p>
                <p className="text-xs text-gray-500">
                  {u.online ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
