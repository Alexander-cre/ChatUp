import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { auth } from "../config"
import { db } from "../config"

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)

        // 🔥 THIS CREATES THE FIRESTORE COLLECTION
        await setDoc(
          doc(db, "users", firebaseUser.uid),
          {
            uid: firebaseUser.uid,
            displayName: firebaseUser.displayName,
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL,
            online: true,
            lastSeen: serverTimestamp(),
          },
          { merge: true }
        )
      } else {
        setUser(null)
      }

      setLoading(false)
    })

    return () => unsub()
  }, [])

  return { user, loading }
}
