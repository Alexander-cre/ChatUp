import {
    collection,
    onSnapshot,
    query
  } from "firebase/firestore"
  import { db } from "../config"
  
  // Listen to all users except current
  export const listenToUsers = (currentUid, callback) => {
    const usersRef = collection(db, "users")
    const q = query(usersRef)
  
    return onSnapshot(q, (snapshot) => {
      const users = snapshot.docs
        .map(doc => doc.data())
        .filter(user => user.uid !== currentUid)
  
      callback(users)
    })
  }
  