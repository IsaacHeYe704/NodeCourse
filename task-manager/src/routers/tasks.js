const express = require('express')
const router = express.Router()
const Task = require('../models/task')
const {auth} = require('../middleware/auth')

router.patch('/tasks/:id',auth,async (req,res)=>{
    const taskId = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ["description", "Completed"]
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
    if(!isValidOperation) return res.send({error: "in valid update!!"})
    try {
        //find the task by id and owner
        const task= await Task.findOne({_id:taskId,owner:req.user._id})
        // const task = await Task.findByIdAndUpdate(taskId,req.body,{new: true, runValidators: true})
        if(!task) return res.status(404).send({error:"no task found with that id"})
        //update the task
        updates.forEach((update)=>{
            task[update] = req.body[update]
        })
        await task.save()
        res.send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})
// GET/tasks?compleated
// GET/tasks?limit ==> what amount of results we would want
// GET/tasks?skip ==> what amount of results we would want to skip
// GET/tasks?sortBy=createdAt_desc ==> sorting criteria 
router.get('/tasks',auth,async (req,res)=>{

    const match = {}
    const sort =  {}
    if(req.query.completed){
        match.Completed = req.query.completed === "true"
    }
    if(req.query.sortBy){
        const parts = req.query.sortBy.split("_")
        sort[parts[0]] = parts[1] === "desc" ? -1 : 1
    }
    try {
        const tasks = await Task.find({owner:req.user._id,Completed:match.Completed}).limit(parseInt(req.query.limit)).skip(parseInt(req.query.skip)).sort(sort)
        res.send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }
})
router.get("/tasks/:id",auth,async (req,res)=>{
    const _id =req.params.id
    try {
        //find the task by the owner and its own id
        const task = await Task.findOne({_id, owner:req.user._id})
        if(!task){
            return res.status(404).send("Task not found")
        }
        res.send(task)
        
    } catch (error) {
        res.send(error)
    }
})

router.post("/tasks",auth , async (req,res)=> {
    try {
        const task = await new Task({...req.body,owner:req.user._id})
        await task.save()
        res.status(201).send(task)
    } catch (error) {   
        res.status(400).send(error)
    }
})
router.delete("/tasks/:id",auth,async (req,res)=>{
    let _id = req.params.id;
    let ownerId = req.user._id
    try {
        
        const deletedTask = await Task.findOneAndDelete( {_id, owner: ownerId})
        if(!deletedTask){
            throw new Error('Task not found')
        }
        res.send({
            msg:`Task ${_id} succesfully deleted`,
            deletedTask
        })
    } catch (error) {  
        res.status(401).send(error)
    } 
})
module.exports = router