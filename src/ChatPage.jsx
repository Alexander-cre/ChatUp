import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "./components/sidebar"

export default function ChatPage({
  user,
  users,
  selectedUser,
  setSelectedUser,
  messages,
  onSendMessage,
  onLogout
}) {
  const [text, setText] = useState("")
  const messagesEndRef = useRef(null)
  const navigate = useNavigate() // ✅ Router navigation

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="h-screen flex bg-gray-100 relative">

      {/* AVATAR */}
      <button
        onClick={() => navigate("/profile")} // ✅ Navigate to profile page
        className="absolute top-4 right-4 z-50"
      >
        <img
          src={user.photoURL}
          alt={user.displayName}
          className="w-10 h-10 rounded-full border hover:scale-105 transition"
        />
      </button>

      {/* SIDEBAR */}
      <Sidebar
        users={users}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <div className="h-16 bg-white border-b flex items-center px-4">
          {selectedUser ? (
            <div className="flex items-center gap-3">
              <img
                src={selectedUser.photoURL}
                alt={selectedUser.displayName}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="font-medium">{selectedUser.displayName}</p>
                <p className="text-xs text-gray-500">
                  {selectedUser.online ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Select a user to start chatting</p>
          )}
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.length === 0 && selectedUser && (
            <p className="text-center text-gray-400 text-sm">
              No messages yet
            </p>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.senderId === user.uid ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs text-sm ${
                  msg.senderId === user.uid
                    ? "bg-blue-500 text-white"
                    : "bg-white border"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        {selectedUser && (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              onSendMessage(text)
              setText("")
            }}
            className="h-16 bg-white border-t flex items-center px-4 gap-2"
          >
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message…"
              className="flex-1 border rounded px-3 py-2 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
