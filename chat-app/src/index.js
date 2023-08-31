const express = require("express")
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const Filter =require('bad-words')

const {generateMessage} = require('./utils/messages')
const {generateLocationMessage} = require('./utils/locationMessage')
const {adduser,getUser,getUsersInRoom,removeUser} = require('./utils/users')

const publicDirectory = path.join(__dirname,'../public')

const app = express()
const server = http.createServer(app)
const io = socketio(server)


const port = process.env.PORT || 3000

app.use(express.static(publicDirectory))
// let count = 0
io.on("connection", (socket) => { 
    
    
    socket.on('join',({username,room},callback)=>{
        const {error, user} = adduser({id: socket.id ,username,room})
        if(error){
            return callback(error)
        }

        socket.join(user.room)
        adduser


        socket.emit("message",generateMessage('admin','Welcome!'))
        socket.broadcast.to(user.room).emit("message", generateMessage('admin',`${user.userName} has join` ))
        io.to(user.room).emit('roomData',{
            users: getUsersInRoom(user.room),
            room: user.room
        })
        callback()
    })
    
    socket.on("sendMessage",(message, callback)=>{
        const filter = new Filter()
        if(filter.isProfane(message)){
            return callback("Profanity is not allowed")
        }
        const user = getUser(socket.id)

        io.to(user.room).emit("message",generateMessage(user.userName,message))
        callback()
    })
    socket.on("sendLocation",(coords, callback)=>{
        const user = getUser(socket.id)
        console.log(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
        
        io.to(user.room).emit("locationMessage", generateLocationMessage(user.userName,`https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback()
    })
    
    


    socket.on("disconnect", ()=>{
        const user = removeUser(socket.id)
        if(user){
            io.to(user.room).emit("message", generateMessage(user.userName,`${user.userName} has disconnected`))
            io.to(user.room).emit('roomData',{
                users: getUsersInRoom(user.room),
                room: user.room
            })
        }
    })


 });

 





server.listen(port, ()=>{
    console.log(`server listening on port ${port}`);
})

