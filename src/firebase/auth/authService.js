import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup
  } from "firebase/auth"
  
  import {
    doc,
    setDoc,
    serverTimestamp
  } from "firebase/firestore"
  
  import { auth, db } from "../config"

  import { setUserOffline } from "../presence/presenceService"
  
  // Create / update user document
  const createUserDoc = async (user) => {
    if (!user) return
  
    const userRef = doc(db, "users", user.uid)
  
    await setDoc(
      userRef,
      {
        uid: user.uid,
        displayName: user.displayName || "Anonymous",
        email: user.email,
        photoURL: user.photoURL || null,
        online: true,
        lastSeen: serverTimestamp(),
        createdAt: serverTimestamp(),
      },
      { merge: true }
    )
  }
  
  // Email signup
  export const registerWithEmail = async (email, password) => {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    await createUserDoc(res.user)
    return res.user
  }
  
  // Email login
  export const loginWithEmail = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password)
    await createUserDoc(res.user)
    return res.user
  }
  
  // Google login
  export const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const res = await signInWithPopup(auth, provider)
    await createUserDoc(res.user)
    return res.user
  }
  
  // Logout
  export const logoutUser = async () => {
    const user = auth.currentUser
    if (user) {
      await setUserOffline(user.uid)
    }
    await signOut(auth)
  }