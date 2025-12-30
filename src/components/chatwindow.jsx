import { useState } from "react"
import { ReactMic } from "react-mic"
import EmojiPicker from "emoji-picker-react"

export default function ChatWindow({ selectedUser }) {
  const [messages, setMessages] = useState([
    { id: 1, sender: "them", text: "Hey 👋", type: "text" },
    { id: 2, sender: "me", text: "Hi! How are you?", type: "text" },
    { id: 3, sender: "them", text: "Nice UI 🔥", type: "text" }
  ])

  const [text, setText] = useState("")
  const [typing, setTyping] = useState(false)
  const [showEmoji, setShowEmoji] = useState(false)
  const [recording, setRecording] = useState(false)

  /* ---------------- TEXT MESSAGE ---------------- */
  const sendMessage = () => {
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
    setShowEmoji(false)

    setTimeout(() => setTyping(true), 500)
    setTimeout(() => setTyping(false), 2000)
  }

  /* ---------------- EMOJI ---------------- */
  const onEmojiClick = (emojiData) => {
    setText(prev => prev + emojiData.emoji)
  }

  /* ---------------- VOICE ---------------- */
  const toggleRecording = () => {
    setRecording(prev => !prev)
  }

  const onStop = (recordedBlob) => {
    const audioURL = URL.createObjectURL(recordedBlob.blob)

    const msg = {
      id: Date.now(),
      sender: "me",
      text: audioURL,
      type: "voice",
      status: "sent"
    }

    setMessages(prev => [...prev, msg])
  }

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Select a user to start chatting
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1 bg-gray-50">

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs text-sm
                ${msg.sender === "me"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none shadow"
                }`}
            >
              {msg.type === "voice" ? (
                <audio controls src={msg.text} />
              ) : (
                msg.text
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
      <div className="border-t bg-white p-3 flex items-center gap-2 relative">

        {showEmoji && (
          <div className="absolute bottom-16 left-3 z-50">
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}

        {/* Emoji */}
        <button onClick={() => setShowEmoji(p => !p)} className="text-xl">
          😀
        </button>

        {/* Input */}
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Type a message…"
          className="flex-1 px-4 py-2 rounded-full bg-gray-100 focus:outline-none"
        />

        {/* Mic */}
        <button
          onClick={toggleRecording}
          className={`p-3 rounded-full flex items-center justify-center
            ${recording ? "bg-red-600 animate-pulse" : "bg-gray-200"}
          `}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 14a3 3 0 003-3V5a3 3 0 10-6 0v6a3 3 0 003 3z" />
            <path d="M19 11a1 1 0 10-2 0 5 5 0 01-10 0 1 1 0 10-2 0 7 7 0 006 6.92V21a1 1 0 102 0v-3.08A7 7 0 0019 11z" />
          </svg>
        </button>

        {/* Send */}
        <button
          onClick={sendMessage}
          className="p-3 bg-blue-600 rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-45 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l18-9-9 18-3-7-6-2z" />
          </svg>
        </button>

        {/* Recorder */}
        <ReactMic
          record={recording}
          className="hidden"
          onStop={onStop}
        />
      </div>
    </div>
  )
}
