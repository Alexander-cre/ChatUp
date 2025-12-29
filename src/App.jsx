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

import ChatPage from "./ChatPage"

export default function App() {
  const { user, loading } = useAuth()

  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [messages, setMessages] = useState([])

  /* ---------------- USERS ---------------- */
  useEffect(() => {
    if (!user) return
    const unsub = listenToUsers(user.uid, setUsers)
    return () => unsub()
  }, [user])

  /* ---------------- MESSAGES ---------------- */
  useEffect(() => {
    if (!user || !selectedUser) return

    const chatId = getChatId(user.uid, selectedUser.uid)
    createChatIfNotExists(chatId, [user.uid, selectedUser.uid])

    const unsub = listenToMessages(chatId, setMessages)
    return () => unsub()
  }, [user, selectedUser])

  /* ---------------- SEND MESSAGE ---------------- */
  const handleSendMessage = async text => {
    if (!text.trim() || !selectedUser) return
    const chatId = getChatId(user.uid, selectedUser.uid)
    await sendMessage(chatId, user.uid, text)
  }

  /* ---------------- AUTH UI ---------------- */
  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading…</div>
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button
          onClick={loginWithGoogle}
          className="px-6 py-3 bg-blue-600 text-white rounded"
        >
          Sign in with Google
        </button>
      </div>
    )
  }

  /* ---------------- MAIN UI ---------------- */
  return (
    <ChatPage
      user={user}
      users={users}
      selectedUser={selectedUser}
      setSelectedUser={setSelectedUser}
      messages={messages}
      onSendMessage={handleSendMessage}
      onLogout={logoutUser}
    />
  )
}
