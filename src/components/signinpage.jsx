import { loginWithGoogle } from "../firebase/auth/authService"

export default function SignInPage() {
  const handleGoogleLogin = async () => {
    await loginWithGoogle()
    // DO NOT navigate – App.jsx will auto switch
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold text-gray-800">Welcome to ChatUp</h1>
        <p className="text-gray-500 mt-2">
          Sign in to continue chatting
        </p>

        <button
          onClick={handleGoogleLogin}
          className="mt-6 w-full flex items-center justify-center gap-3 py-3 rounded-lg bg-black text-white hover:bg-gray-900 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5 h-5"
            alt="Google"
          />
          Continue with Google
        </button>
      </div>
    </div>
  )
}
