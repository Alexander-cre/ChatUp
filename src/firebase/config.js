import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCrwwm0RRqfmow2EYhuhzociO8gitdE8FU",
  authDomain: "chatup-fd956.firebaseapp.com", // REQUIRED
  projectId: "chatup-fd956",
  storageBucket: "chatup-fd956.firebasestorage.app",
  messagingSenderId: "757350828510",
  appId: "1:757350828510:web:4c6a16b9370b23bac9b54f",
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
