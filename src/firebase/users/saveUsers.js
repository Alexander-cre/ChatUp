// saveUser.js
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "./firebase"

export const saveUser = async (user) => {
  if (!user) return

  await setDoc(
    doc(db, "users", user.uid),
    {
      uid: user.uid,
      name: user.displayName || user.name,
      email: user.email,
      photoURL: user.photoURL,
      createdAt: serverTimestamp()
    },
    { merge: true } // merges if user already exists
  )
}
