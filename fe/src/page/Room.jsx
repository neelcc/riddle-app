import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'

const Room = () => {

    const { handleCreateRoom, roomId, wsRef, handleJoinRoom, setUserRoomId, userRoomId, name , setName } = useContext(AppContext)

    

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

    <div className="flex items-center justify-center  min-h-screen relative z-10">

      <div className='bg-gray-100 px-6 rounded py-4 flex flex-col gap-3 ' >
           <div className='  ' >
               <span> <h3 className=' text-4xl font-medium '>Real Time Chat</h3>
               </span> 
               <p className=' text-lg text-gray-800  ' >temporary room that expires after all users exit</p> 
           </div>
           <button onClick={handleCreateRoom} className=' bg-white  border-2 border-gray-400 py-4 cursor-pointer rounded-md w-full font-medium text-xl ' >Create New Room</button>
           <input value={name} onChange={(e)=>{setName(e.target.value)}} className=' bg-gray-300 border-1 border-gray-500 outline-none px-2 py-4 rounded-md font-medium ' placeholder='Enter your name' type="text" />
           <div className=' flex justify-between ' >
                <input value={userRoomId} onChange={(e)=>setUserRoomId(e.target.value)} className=' bg-gray-300 border-1 border-gray-500 outline-none px-2 py-4 rounded-md font-medium ' placeholder='Enter Room Code' type="text" />
                <button onClick={handleJoinRoom} className=' bg-white border border-gray-400 px-2 py-4 rounded-md  font-medium text-md cursor-pointer ' >Join Room</button>
           </div>
      </div>

    </div>

  </div>
  )
}

export default Room
