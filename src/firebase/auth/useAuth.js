import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { auth } from "../config"
import { db } from "../config"

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async currentUser => {
      setUser(currentUser)
      setLoading(false)

      if (currentUser) {
        await setDoc(
          doc(db, "users", currentUser.uid),
          {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.photoURL,
            online: true,
            lastSeen: serverTimestamp()
          },
          { merge: true }
        )
      }
    })

    return unsub
  }, [])

  return { user, loading }
}
