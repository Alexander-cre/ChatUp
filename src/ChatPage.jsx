import { useState } from "react"
import Sidebar from "./components/sidebar"
import ChatWindow from "./components/chatwindow"
import ProfilePage from "./components/profile"

const STATIC_USERS = [
  { uid: "1", displayName: "John Doe", online: true },
  { uid: "2", displayName: "Sarah Lee", online: false },
  { uid: "3", displayName: "Michael Scott", online: true },
  { uid: "4", displayName: "Angela", online: false }
]

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const [showProfile, setShowProfile] = useState(false)


  return (
    <div className="h-screen flex flex-col bg-gray-100">

      {/* 🔹 MOBILE TOP BAR */}
      <div className="md:hidden h-14 bg-white border-b flex items-center px-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-black text-2xl p-2 rounded-md hover:bg-gray-200 active:bg-gray-300"
        >
          ☰
        </button>

        <span className="ml-4 font-semibold text-gray-800">
          {selectedUser ? selectedUser.displayName : "ChatUp"}
        </span>
      </div>

      {/* 🔹 MAIN CONTENT */}
      <div className="flex flex-1 relative overflow-hidden">
        <Sidebar
            users={STATIC_USERS}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
        />

        <ChatWindow selectedUser={selectedUser} />
        </div>

    </div>
  )
}
