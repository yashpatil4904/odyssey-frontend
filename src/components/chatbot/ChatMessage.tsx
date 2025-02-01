import React from 'react';
import ChatbotIcon from "./Chatboticon";

interface ChatMessageProps {
  chat: {
    hideInChat?: boolean;
    role: "user" | "model";
    text: string;
    isError?: boolean;
  };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ chat }) => {
  return !chat.hideInChat ? (
    <div className={`message ${chat.role === "model" ? 'bot' : 'user'}-message ${chat.isError ? "error" : ""}`}>
      {chat.role === "model" && <ChatbotIcon />}
      <p className="message-text">{chat.text}</p>
    </div>
  ) : null;
};

export default ChatMessage; 