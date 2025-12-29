import { useState } from "react";
import EmojiPicker from "emoji-picker-react";

function ChatInput({ sendMessage }) {
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setMessage(prev => prev + emojiObject.emoji);
    setShowEmoji(false);
  };

  return (
    <div className="chat-input">
      {showEmoji && <EmojiPicker onEmojiClick={onEmojiClick} />}
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={() => setShowEmoji(!showEmoji)}>😀</button>
      <button onClick={() => { sendMessage(message); setMessage(""); }}>Send</button>
    </div>
  );
}
