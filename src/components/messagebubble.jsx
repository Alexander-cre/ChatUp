export default function MessageBubble({ message, isMe }) {
    return (
      <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
        <div
          className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
            isMe
              ? "bg-blue-500 text-white rounded-br-none"
              : "bg-white text-gray-800 rounded-bl-none"
          }`}
        >
          {message.text}
        </div>
      </div>
    )
  }
  