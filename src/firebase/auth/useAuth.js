import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../config"
import {
  setUserOnline,
  setUserOffline
} from "../presence/presenceService"

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await setUserOnline(currentUser.uid)
        setUser(currentUser)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsub()
  }, [])

  // Handle tab close / refresh
  useEffect(() => {
    if (!user) return

    const handleUnload = async () => {
      await setUserOffline(user.uid)
    }

    window.addEventListener("beforeunload", handleUnload)

    return () => {
      handleUnload()
      window.removeEventListener("beforeunload", handleUnload)
    }
  }, [user])

  return { user, loading }
}
