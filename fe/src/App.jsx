import React from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Room from './page/Room';
import ChatApp from './page/ChatApp';
import { ToastContainer,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <div className=' bg-black ' >
      <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
/>
      <Routes>
        <Route path='/' element={<Room/>} />
        <Route path='/chat' element={<ChatApp/>}  />
      </Routes>
    </div>
  ) 
}

export default App
