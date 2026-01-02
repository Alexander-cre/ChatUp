import { useNavigate } from "react-router-dom"

export default function ProfilePage({ user, onLogout }) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center relative">



      <div className="bg-white p-6 rounded-lg shadow w-full max-w-md">

        <div className="flex flex-col items-center">
          <img
            src={user.photoURL}
            alt={user.displayName}
            className="w-24 h-24 rounded-full border mb-4"
          />

          <h2 className="text-xl font-semibold">{user.displayName}</h2>
          <p className="text-gray-500">{user.email}</p>

          <div className="mt-4 w-full border-t pt-4 text-sm text-gray-600">
            <p><strong>Provider:</strong> Google</p>
            <p><strong>User ID:</strong> {user.uid}</p>
          </div>

          <button
            onClick={onLogout}
            className="mt-6 w-full bg-red-500 text-white py-2 rounded"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  )
}
