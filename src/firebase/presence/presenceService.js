import { doc, updateDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../config"

// Set user online
export const setUserOnline = async (uid) => {
  if (!uid) return

  const userRef = doc(db, "users", uid)

  await updateDoc(userRef, {
    online: true,
    lastSeen: serverTimestamp(),
  })
}

// Set user offline
export const setUserOffline = async (uid) => {
  if (!uid) return

  const userRef = doc(db, "users", uid)

  await updateDoc(userRef, {
    online: false,
    lastSeen: serverTimestamp(),
  })
}
