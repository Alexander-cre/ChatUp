import { auth } from "../config"
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"

const provider = new GoogleAuthProvider()

export const loginWithGoogle = async () => {
  try {
    await signInWithPopup(auth, provider)
  } catch (error) {
    console.error("Google login failed:", error)
  }
}

export const logoutUser = () => signOut(auth)
