import { useState } from "react"
import { ReactMic } from "react-mic"
import EmojiPicker from "emoji-picker-react"

// Placeholder for sending to Firebase
const sendMessageToFirebase = async (msg) => {
  console.log("Send to Firebase:", msg)
}

export default function ChatWindow({ selectedUser }) {
  const [messages, setMessages] = useState([
    { id: 1, sender: "them", text: "Hey 👋", status: "seen" },
    { id: 2, sender: "me", text: "Hi! How are you?", status: "seen" },
    { id: 3, sender: "them", text: "Nice UI 🔥", status: "seen" }
  ])
  const [text, setText] = useState("")
  const [typing, setTyping] = useState(false)
  const [showEmoji, setShowEmoji] = useState(false)
  const [record, setRecord] = useState(false)

  // Send text message
  const sendMessage = async () => {
    if (!text.trim()) return

    const msg = {
      id: Date.now(),
      sender: "me",
      text,
      type: "text",
      status: "sent"
    }

    setMessages(prev => [...prev, msg])
    setText("")
    await sendMessageToFirebase(msg)

    setTimeout(() => setTyping(true), 500)
    setTimeout(() => {
      setTyping(false)
      setMessages(prev =>
        prev.map(m => (m.sender === "me" ? { ...m, status: "seen" } : m))
      )
    }, 2000)
  }

  // Emoji selection (fixed for v4+)
  const onEmojiClick = (emojiData) => {
    setText(prev => prev + emojiData.emoji)
    setShowEmoji(false)
  }

  // Voice note handling
  const startRecording = () => setRecord(true)
  const stopRecording = async (recordedBlob) => {
    setRecord(false)
    const audioFile = recordedBlob.blob
    const audioURL = URL.createObjectURL(audioFile)

    const msg = {
      id: Date.now(),
      sender: "me",
      text: audioURL,
      type: "voice",
      status: "sent"
    }
    setMessages(prev => [...prev, msg])
    await sendMessageToFirebase(msg)
  }

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Select a user to start chatting
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1 bg-gray-50 dark:bg-gray-900">

      {/* HEADER */}
      <div className="hidden md:flex items-center px-6 h-16 border-b bg-white dark:bg-gray-800">
        <span className="font-semibold text-gray-800 dark:text-gray-200">
          {selectedUser.displayName}
        </span>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs text-sm
                ${
                  msg.sender === "me"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none shadow"
                }`}
            >
              {msg.type === "voice" ? (
                <audio controls src={msg.text}></audio>
              ) : (
                msg.text
              )}
              {msg.sender === "me" && (
                <div className="text-[10px] mt-1 text-right opacity-70">
                  {msg.status}
                </div>
              )}
            </div>
          </div>
        ))}

        {typing && (
          <div className="text-xs text-gray-400 italic">
            {selectedUser.displayName} is typing…
          </div>
        )}
      </div>

{/* INPUT BAR */}
<div className="border-t bg-white dark:bg-gray-800 p-3 flex gap-2 items-center relative">
  {showEmoji && (
    <div className="absolute bottom-16 left-3 z-50">
      <EmojiPicker onEmojiClick={onEmojiClick} />
    </div>
  )}

  {/* Emoji button */}
  <button
    onClick={() => setShowEmoji(prev => !prev)}
    className="text-xl"
  >
    😀
  </button>

  <input
    value={text}
    onChange={e => setText(e.target.value)}
    placeholder="Type a message…"
    className="flex-1 px-4 py-2 rounded-full text-sm
      bg-gray-100 dark:bg-gray-700
      text-gray-800 dark:text-white
      focus:outline-none"
  />

  {/* Voice record button */}
  <div className="relative">
    <button
      onMouseDown={startRecording}
      onMouseUp={() => setRecord(false)}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
    >
      {/* Mic SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-800 dark:text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1v12m0 0a3 3 0 003-3V5a3 3 0 00-6 0v5a3 3 0 003 3zm0 0v4m0 4h0" />
      </svg>
    </button>

    {/* Recording animation */}
    {record && (
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
        <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse"></div>
      </div>
    )}
  </div>

  {/* Telegram-style send button */}
  <button
    onClick={sendMessage}
    className="p-3 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 transform rotate-45 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l18-9-9 18-3-7-6-2z" />
    </svg>
  </button>

  {/* ReactMic hidden component */}
  <ReactMic
    record={record}
    className="hidden"
    onStop={stopRecording}
    strokeColor="#000000"
    backgroundColor="#FF4081"
  />
</div>

    </div>
  )
}
