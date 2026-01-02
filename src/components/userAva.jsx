import { useNavigate } from "react-router-dom"
import { useAuth } from "../firebase/auth/useAuth"

export default function UserAvatar() {
  const { user } = useAuth()
  const navigate = useNavigate()

  if (!user) return null

  return (
    <button
      onClick={() => navigate("/profile")}
      className="fixed top-4 right-4 z-50"
    >
      <img
        src={user.photoURL}
        alt={user.displayName}
        className="w-10 h-10 rounded-full border-2 border-gray-300 hover:scale-105 transition"
      />
    </button>
  )
}
