const users = []


const adduser = ({id , username, room})=>{
    userName = username.trim().toLowerCase()
    room = room.trim().toLowerCase()
    if(!userName || !room ){
        return {
            error: 'Username and room are required'
        }
    }

    const existingUser = users.find((user) => {
        return user.room === room && user.userName === userName
    })

    if( existingUser){
        return{
            error: 'Username is in use'
        }
    }

    const user = {
        id,userName, room
    }
    users.push(user)
    return {user}
}
const removeUser = (id)=>{ 
    const index = users.findIndex((user)=>{
        return user.id === id
    })
    if(index !== -1){
        return users.splice(index,1)[0]
    }
}

const getUser = (id)=>{
    return users.find((user)=> user.id === id )
}
const getUsersInRoom = (room)=>{
    return users.filter((user) => user.room === room)
}


module.exports = {adduser , removeUser, getUser, getUsersInRoom}