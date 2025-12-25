import { useEffect, useState } from "react"
import { useAuth } from "./firebase/auth/useAuth"
import { logoutUser, loginWithGoogle } from "./firebase/auth/authService"
import { listenToUsers } from "./firebase/users/userService"

import {
  getChatId,
  createChatIfNotExists,
  sendMessage,
  listenToMessages
} from "./firebase/chat/chatService"

export default function App() {
  const { user, loading } = useAuth()

  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [text, setText] = useState("")

  // Load users
  useEffect(() => {
    if (!user) return
    const unsub = listenToUsers(user.uid, setUsers)
    return () => unsub()
  }, [user])

  // Load messages when chat changes
  useEffect(() => {
    if (!user || !selectedUser) return

    const chatId = getChatId(user.uid, selectedUser.uid)
    createChatIfNotExists(chatId, [user.uid, selectedUser.uid])

    const unsub = listenToMessages(chatId, setMessages)
    return () => unsub()
  }, [user, selectedUser])

  if (loading) return <div>Loading...</div>

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button
          onClick={loginWithGoogle}
          className="px-6 py-3 bg-green-600 text-white rounded"
        >
          Sign in
        </button>
      </div>
    )
  }

  const handleSend = async () => {
    if (!text.trim() || !selectedUser) return
    const chatId = getChatId(user.uid, selectedUser.uid)
    await sendMessage(chatId, user.uid, text)
    setText("")
  }

  return (
    <div className="min-h-screen flex bg-slate-900 text-white">
      
      {/* Sidebar */}
      <div className="w-64 border-r border-slate-700 p-4">
        <div className="flex justify-between mb-4">
          <span className="font-bold">Users</span>
          <button onClick={logoutUser} className="text-red-400">
            Logout
          </button>
        </div>

        <div className="space-y-2">
          {users.map(u => (
            <div
              key={u.uid}
              onClick={() => setSelectedUser(u)}
              className={`p-2 rounded cursor-pointer flex justify-between ${
                selectedUser?.uid === u.uid
                  ? "bg-slate-700"
                  : "hover:bg-slate-800"
              }`}
            >
              <span>{u.displayName}</span>
              <span
                className={`text-xs ${
                  u.online ? "text-green-400" : "text-gray-400"
                }`}
              >
                {u.online ? "online" : "offline"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col p-4">
        {selectedUser ? (
          <>
            <div className="mb-2 font-semibold">
              Chat with {selectedUser.displayName}
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto mb-2">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`p-2 rounded max-w-xs ${
                    msg.senderId === user.uid
                      ? "bg-green-600 ml-auto"
                      : "bg-slate-700"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                className="flex-1 p-2 text-black rounded"
                value={text}
                onChange={e => setText(e.target.value)}
              />
              <button
                onClick={handleSend}
                className="px-4 bg-green-600 rounded"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  )
}
