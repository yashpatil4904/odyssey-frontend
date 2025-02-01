import { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import ChatbotIcon from "./Chatboticon";
import Chatform from "./Chatform";
import { trackerinfo } from "./trackerinfo";
import './chatbot.css';

interface ChatMessage {
  hideInChat?: boolean;
  role: "user" | "model";
  text: string;
  isError?: boolean;
}

interface ApiResponse {
  candidates: [{
    content: {
      parts: [{
        text: string;
      }];
    };
  }];
  error?: {
    message: string;
  };
}

const Chatbot: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([{
    hideInChat: true,
    role: "model",
    text: trackerinfo,
  }]);
  const [showChatbot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const generateBotResponse = async (history: ChatMessage[]) => {
    const updateHistory = (text: string, isError: boolean = false) => {
      setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking...."), { role: "model", text, isError }]);
    };

    const formattedHistory = history.map(({ role, text }) => ({ role, parts: [{ text }] }));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: formattedHistory }),
    };

    try {
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data: ApiResponse = await response.json();
      
      if (!response.ok) throw new Error(data.error?.message || "Something went wrong!");
      
      const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      updateHistory(apiResponseText);
    } catch (error) {
      updateHistory((error as Error).message, true);
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [chatHistory]);

  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <button onClick={() => setShowChatbot(prev => !prev)} id="chatbot-toggler">
        <span className="material-symbols-rounded">mode_comment</span>
        <span className="material-symbols-rounded">close</span>
      </button>
      <div className="chatbot-popup">
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2>Fitzy</h2>
          </div>
          <button onClick={() => setShowChatbot(prev => !prev)} className="material-symbols-rounded">
            keyboard_arrow_down
          </button>
        </div>
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hey there <br /> how can I help you ?😇
            </p>
          </div>
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>
        <div className="chat-footer">
          <Chatform 
            chatHistory={chatHistory} 
            setChatHistory={setChatHistory} 
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default Chatbot; 