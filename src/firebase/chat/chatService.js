// src/firebase/chat/chatService.js

import {
    collection,
    doc,
    setDoc,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp
  } from "firebase/firestore"
  
  import { db } from "../config"
  
  export const getChatId = (uid1, uid2) => {
    return uid1 < uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`
  }
  
  export const createChatIfNotExists = async (chatId, participants) => {
    const chatRef = doc(db, "chats", chatId)
  
    await setDoc(
      chatRef,
      {
        participants,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    )
  }
  
  export const sendMessage = async (chatId, senderId, text) => {
    const messagesRef = collection(db, "chats", chatId, "messages")
  
    await addDoc(messagesRef, {
      senderId,
      text,
      createdAt: serverTimestamp(),
    })
  
    await setDoc(
      doc(db, "chats", chatId),
      {
        lastMessage: text,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    )
  }
  
  export const listenToMessages = (chatId, callback) => {
    const messagesRef = collection(db, "chats", chatId, "messages")
    const q = query(messagesRef, orderBy("createdAt"))
  
    return onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      callback(messages)
    })
  }
  