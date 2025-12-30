import { auth } from "../config"
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"

const provider = new GoogleAuthProvider()

// Login with Google
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider)
    const user = result.user

    // You can return the user object to store in state
    return {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    }
  } catch (error) {
    console.error("Google login failed:", error)
    // Optionally, return null to indicate failure
    return null
  }
}

// Logout user
export const logoutUser = async () => {
  try {
    await signOut(auth)
    console.log("User logged out successfully")
  } catch (error) {
    console.error("Logout failed:", error)
  }
}
