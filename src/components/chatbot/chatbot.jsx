import { useEffect, useRef,useState } from "react"
import ChatMessage from "./ChatMessage"
import ChatbotIcon from "./Chatboticon"
import Chatform from "./Chatform"
import {trackerinfo}  from "./trackerinfo"
import './chatbot.css';
const Chatbot =()=>{
  const [chatHistory,setChatHistory]= useState([{
    hideInChat:true,
    role:"model",
    text :trackerinfo,
  }])
  const [showChatbot,setShowChatbot]=useState(false);
  const chatBodyRef =useRef();
  const generateBotResponse = async(history) =>{

    //helper function to update history
    const updateHistory=(text,isError=false)=>{
      setChatHistory(prev=>[...prev.filter(msg=>msg.text !=="Thinking...."),{role:"model",text,isError}]);

    }
      history = history.map(({role,text})=>({role,parts:[{text}]}));

      const requestOptions={
        method :"POST",
        headers :{"Content-Type": "application/json"},
        body : JSON.stringify({contents:history}),
      };
      try{
        const response = await fetch(import.meta.env.VITE_API_URL,requestOptions); // API KEY 
        const data=await response.json();
        if(!response.ok) throw new Error(data.error.message || "something went wrong!");
        console.log(data);
        const apiResponseText=data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim();
        updateHistory(apiResponseText);
        }catch(error){
          updateHistory(error.message,true);
        }
  };
  useEffect(()=>{
    chatBodyRef.current.scrollTo({top:chatBodyRef.current.scrollHeight,behavior :"smooth"});
  },[chatHistory])
  return (
    <div className= {`container ${showChatbot?"show-chatbot" : ""}`}>
      <button onClick={()=> setShowChatbot((prev)=>!prev)} id="chatbot-toggler">
        <span className="material-symbols-rounded">mode_comment</span>
        <span className="material-symbols-rounded">close</span>

      </button>
      <div className="chatbot-popup">
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon/>
            <h2>Fitzy</h2>
          </div>
            <button onClick={()=> setShowChatbot((prev)=>!prev)} className="material-symbols-rounded">keyboard_arrow_down</button>
          </div>
            {/* chat bot body*/}
            <div ref={chatBodyRef} className="chat-body">
              <div className="message bot-message">
                <ChatbotIcon/>
                <p className="message-text">
                  Hey there <br/> how can I help you ?😇
                  
                </p>
              </div>
              {/*render  the chat history dynamically*/}
              {chatHistory.map((chat,index)=>(
                <ChatMessage key={index} chat={chat} />
              ))}
              
            </div>
          {/* chat-footer*/}
          <div className="chat-footer">
            <Chatform chatHistory={chatHistory}  setChatHistory={setChatHistory} generateBotResponse={generateBotResponse}/>
          </div>
        
      </div>
    </div>
  )
}
export default Chatbot;