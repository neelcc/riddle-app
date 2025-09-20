import express from 'express'
import crypto from 'crypto'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import 'dotenv/config'   

const app = express()
app.use(express.json())
app.use(cors())

app.post('/create-room', async (req,res)=>{
    console.log(process.env.JWT_SECRET);
    
    const { name } = req.body
    console.log("from create : "+name);

    if(!name){
        return res.send({
            success:false,
            message : "Name is missing!"
        })
    }
    
    const roomId = crypto.randomBytes(5).toString("base64").replace(/[^a-z]/gi, '').substring(0,6);
    const token = await jwt.sign({ name } , process.env.JWT_SECRET )
    console.log(token);
    
    console.log(roomId);
    return res.send({
        success:true,
        roomId,
        token
    })
})

app.post('/join-room', async (req,res)=>{
    
    const { name } = req.body
    console.log("from join : "+name);
    
    if(!name){
        return res.send({
            success:false,
            message : "Name is missing!"
        })
    }
    
    const token = await jwt.sign({ name } , process.env.JWT_SECRET )
    
    return res.send({
        success:true,
        token
    })
})


app.listen(3000,()=>{
     console.log("Server is running");
})



import { WebSocketServer } from 'ws'


const wss = new WebSocketServer({ port:3001 })

let allSockets = []

wss.on("connection",(socket)=>{

    console.log("Hellow from ws")

    socket.on("message", (message) => {
        // console.log(message);
        const parsedMessage = JSON.parse(message)
        console.log("hii");
        console.log(parsedMessage);
        
        if(parsedMessage.type==='join')
            {
                allSockets.push({
                    socket,
                    room : parsedMessage.payload.roomId,
                    name : parsedMessage.payload.name
                })
            }
            
            if(parsedMessage.type==='chat'){
            let currentUserRoom = null
            console.log("boom");
            console.log(parsedMessage.payload.message);
            console.log("boom");
            console.log(parsedMessage.payload.sender);
            console.log("booom boom");
            console.log(allSockets);
            
            
            for(let i=0 ; i<allSockets.length; i++){
                if(allSockets[i].socket==socket)
                {
                    currentUserRoom = allSockets[i].room
                }
            }
            
            for(let i=0 ; i<allSockets.length; i++){
                if(allSockets[i].room==currentUserRoom)
                {
                    allSockets[i].socket.send(JSON.stringify(parsedMessage))
                }
            }

        }

        socket.on("close", () => {
            allSockets = allSockets.filter(s => s.socket !== socket);
          });
        

      });
})
