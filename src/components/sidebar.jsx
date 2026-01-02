import { useEffect, useState } from "react"
import { collection, onSnapshot } from "firebase/firestore"
import { signOut } from "firebase/auth"
import { db } from "../firebase/config"
import { auth } from "../firebase/config"
import { useAuth } from "../firebase/auth/useAuth"
import { Menu } from "lucide-react"

export default function Sidebar({ selectedUser, setSelectedUser }) {
  const { user: currentUser } = useAuth()
  const [users, setUsers] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!currentUser) return

    const unsub = onSnapshot(collection(db, "users"), snapshot => {
      const allUsers = snapshot.docs
        .map(doc => doc.data())
        .filter(u => u.uid !== currentUser.uid)
      setUsers(allUsers)
    })

    return () => unsub()
  }, [currentUser])

  const handleLogout = async () => {
    await signOut(auth)
  }

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded shadow text-black"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu size={22} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white border-r w-64 flex flex-col
        transform transition-transform duration-300 z-40
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:relative md:flex`}
      >
        {/* Header */}
        <h2 className="text-xl font-bold p-4 border-b">Users</h2>

        {/* User list */}
        <div className="flex-1 overflow-y-auto">
          {users.length === 0 && (
            <p className="p-4 text-gray-500">No users online</p>
          )}

          {users.map(u => (
            <div
              key={u.uid}
              onClick={() => {
                setSelectedUser(u)
                setSidebarOpen(false)
              }}
              className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 ${
                selectedUser?.uid === u.uid ? "bg-gray-200" : ""
              }`}
            >
              <img
                src={u.photoURL}
                alt={u.displayName}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">{u.displayName}</p>
                <p
                  className={`text-xs ${
                    u.online ? "text-green-500" : "text-gray-400"
                  }`}
                >
                  {u.online ? "Active now" : "Offline"}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Logout button */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
          >
            Log out
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  )
}
