import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

export default function ChatApp() {
  const { roomId, handleLogout, messages, wsRef, inputRef, setMessages, name  } = useContext(AppContext)
  

  const handleSend = (e) => {
    if(e) e.preventDefault();
    const message = inputRef.current?.value;
    if(message.trim()=='') return
    inputRef.current.value = ""
    console.log(messages);
    
    wsRef.current.send(JSON.stringify({
      type : "chat",
      payload : {
        message : message
      }
    }))

  };

  return (
    <div className="min-h-screen w-full bg-black relative">
      
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Centered Chat Box */}
      <div className="flex items-center justify-center min-h-screen relative z-10">
        <div className="bg-white w-124 h-[600px] flex flex-col  rounded shadow-lg p-4">
          <div className=' flex items-center justify-between mb-4 ' >
            {/* <h1 className="text-black text-xl font-bold text-center ">Chat</h1> */}
            <button onClick={handleLogout} className=' bg-red-500 text-white font-bold px-3 py-1 rounded-md ' >Stop Chat</button>
            <h1 className=' text-black text-xl font-medium text-center ' >Room Id: #{roomId} </h1>
          </div>

          <div className="flex-1 overflow-y-auto mb-4 space-y-2">
            {messages.map((msg,id) => (
              <div key={id} className=" flex items-center justify-between p-2 bg-black text-white rounded">
                <p>{msg}</p>
                <p>.. {name}</p>
              </div>
            ))}
          </div>

          <div className="flex space-x-2">
            <input
              type="text"
              className="flex-1 p-2 border border-gray-400 rounded"
              placeholder="Type a message..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault(); 
                  handleSend();
                }
              }}
              ref={inputRef}
            />
            <button
              className="bg-black text-white px-4 rounded hover:bg-gray-800"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
