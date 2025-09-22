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
    const [ createLoad , setCreateLoad ] = useState(true)
    const [ joinLoad , setJoinLoad ] = useState(false)
    const [messages, setMessages] = useState([])  
    const wsRef = useRef();
    const inputRef = useRef();

    useEffect(()=>{

        const ws = new WebSocket(import.meta.env.VITE_APP_WS_URL)
        console.log(import.meta.env.VITE_SOME_KEY);
        
        console.log(name);

        ws.onmessage = (event) => {
            
        const parseData = JSON.parse(event.data)
        console.log(parseData);
        
           if(parseData.type==="chat"){
            const message = parseData.payload
            console.log(event);
            console.log("aajo");
            setMessages(m=>[...m,message])
        }
            if(parseData.type=="join"){
              if(parseData.payload.name && parseData.payload.name != name ){     
                toast(`🦄 ${parseData.payload.name} Joined! `, {
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
        }


        
        wsRef.current = ws
    
        ws.onopen = () => {
            
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
        
    
    },[roomId])
   



    useEffect(()=>{
        localStorage.setItem('token',token?token:null)
        localStorage.setItem('roomId',roomId)
        localStorage.setItem('name',name)
        console.log(token);
        console.log(roomId); 
    },[token])

    

    const handleCreateRoom = async () => {
        console.log("hii");
        setCreateLoad(true)
        const { data } = await axios.post(`${import.meta.env.VITE_APP_API_URL}/create-room`,
            {
                name
            }
        )
        
        if(data.success){
            setRoomId(data.roomId)
            setCreateLoad(false)
            console.log((data.roomId));
            navigate('/chat' )
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
                setCreateLoad(false)
        }

        

    }

    const handleJoinRoom = async () => {

        if(!userRoomId) return toast(`🦄 RoomId is Missing !` , {
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
        setJoinLoad(true)
        const { data } = await axios.post(`${import.meta.env.VITE_APP_API_URL}/join-room`,
            {
                name
            }
        )
        if(data.success){
            setRoomId(userRoomId)
            setJoinLoad(false)
            setToken(data.token)
            localStorage.setItem('token',data.token)
            localStorage.setItem('roomId',userRoomId)
            navigate('/chat' )
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
                setJoinLoad(false)
        }

        wsRef.current.send(JSON.stringify({
            type: "join",
            payload: {
              roomId: userRoomId,
              name: name,
            }
          }));
        
    }

    const handleLogout = () => {
        setToken(null)
        setUser(null)
        setRoomId(null)
        localStorage.removeItem('token')
        localStorage.removeItem('roomId')
        localStorage.removeItem('name')
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
        setName,
        createLoad,
        joinLoad,
        setCreateLoad,
        setJoinLoad
    }


    return ( <AppContext.Provider value={value}>
        { children }
    </AppContext.Provider> )
}

