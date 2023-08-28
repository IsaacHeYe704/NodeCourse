/*  
    create is POST
    read GET
    update PATCH
    REPLACE PUT
    DELETE Delete
*/
/*
    parts of a request
    request: is it a post ? what resorce is it looking 
    headers: metadata
    body
*/
const express = require('express')
require('./db/mongoose')
const usersRouter = require('./routers/user')
const tasksRouter = require('./routers/tasks')


const app = express()
const PORT = process.env.port || 3000





app.use(express.json())

app.use(usersRouter)
app.use(tasksRouter)







app.listen(PORT, ()=> console.log(`server listening on port ${PORT}`))