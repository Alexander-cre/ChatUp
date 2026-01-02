import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

import { useAuth } from "./firebase/auth/useAuth"
import { logoutUser } from "./firebase/auth/authService"
import { listenToUsers } from "./firebase/users/userService"
import {
  getChatId,
  createChatIfNotExists,
  listenToMessages,
  sendMessage
} from "./firebase/chat/chatService"

import ChatPage from "./ChatPage"
import SignInPage from "./components/signinpage"
import ProfilePage from "./components/profile"
import Preloader from "./components/preloader"

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

  const handleSendMessage = async (text) => {
    if (!text.trim() || !selectedUser) return
    const chatId = getChatId(user.uid, selectedUser.uid)
    await sendMessage(chatId, user.uid, text)
  }

  if (loading) {
    return <Preloader />
  }

  if (!user) {
    return <SignInPage />
  }

  return (
    <Router>
      <Routes>

        {/* Chat page */}
        <Route
          path="/"
          element={
            <ChatPage
              user={user}
              users={users}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              messages={messages}
              onSendMessage={handleSendMessage}
              onLogout={logoutUser}
            />
          }
        />

        {/* Profile page */}
        <Route
          path="/profile"
          element={<ProfilePage user={user} onLogout={logoutUser} />}
        />

        {/* Redirect unknown routes to chat */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}
