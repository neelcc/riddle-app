import { createContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast, Bounce   } from "react-toastify";

export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {

    const navigate = useNavigate();
    const [ roomId , setRoomId ] = useState(localStorage.getItem('roomId'))
    const [ userRoomId , setUserRoomId ] = useState('')
    const [ token , setToken ] = useState(localStorage.getItem('token'))
    const [ user , setUser ] = useState(null)
    const [ name , setName ] = useState(localStorage.getItem('name'))
    const [messages, setMessages] = useState([])  
    const wsRef = useRef();
    const inputRef = useRef();

    useEffect(()=>{

        const ws = new WebSocket("ws://localhost:3001")

        console.log(name);
        ws.onmessage = (event) => {
            const parseData = JSON.parse(event.data)
            const message = parseData.payload
            console.log(message);
            console.log(event);
            console.log("aajo");
            setMessages(m=>[...m,message])
        }
    
        wsRef.current = ws
    
        ws.onopen = () => {

            console.log("ws.onopen");
            
            ws.send(JSON.stringify({
                type : "join",
                payload : {
                    roomId : roomId,
                    name : name
                }
            }))
        }
    
        return () => {
            ws.close()
        }
        
    
    },[])
   

    useEffect(()=>{
        localStorage.setItem('token',token?token:null)
        localStorage.setItem('roomId',roomId)
        localStorage.setItem('name',name)
        console.log(token);
        console.log(roomId); 
    },[token])

    

    const handleCreateRoom = async () => {
        console.log("hii");
        
        const { data } = await axios.post("http://localhost:3000/create-room",
            {
                name
            }
        )
        
        if(data.success){
            setRoomId(data.roomId)
            console.log((data.roomId));
            navigate('/chat')
            setToken(data.token)
            localStorage.setItem('token',data.token)
            localStorage.setItem('roomId',data.roomId)

        }else{
            toast(`🦄 ${data.message}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
        }

        

    }

    const handleJoinRoom = async () => {
        const { data } = await axios.post("http://localhost:3000/create-room",
            {
                name
            }
        )
        if(data.success){
            setRoomId(userRoomId)
            setToken(data.token)
            localStorage.setItem('token',data.token)
            localStorage.setItem('roomId',userRoomId)
            navigate('/chat')
        }else{
            toast(`🦄 ${data.message}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
        }

        wsRef.current.onopen = () => {
            wsRef.current.send(JSON.stringify({
                type : "join",
                payload : {
                    roomId : roomId,
                    name : name
                }
            }))
        }
        
    }

    const handleLogout = () => {
        setToken(null)
        setUser(null)
        setRoomId(null)
        localStorage.removeItem('token')
        localStorage.removeItem('roomId')
        navigate('/')
        setMessages([])
    }

    const value = {
        roomId,
        setRoomId,
        handleCreateRoom,
        token,
        setToken,
        user,
        setUser,
        handleLogout,
        wsRef,
        inputRef,
        messages,
        setMessages,
        handleJoinRoom,
        userRoomId,
        setUserRoomId,
        name,
        setName
    }


    return ( <AppContext.Provider value={value}>
        { children }
    </AppContext.Provider> )
}

