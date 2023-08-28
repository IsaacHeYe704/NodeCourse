const multer = require('multer')
const express = require('express')

const router = new express.Router()

const User = require('../models/user')
const {auth} = require('../middleware/auth')
const upload = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('File must be an image(jpg,jpeg,png)'))
        }
        cb(undefined,true)
        // cb(new Error('File must be a PDF'))
        // cb(undefined,true) file is expected
    }
})




router.get('/users/me',auth,async(req,res)=>{
    res.send(req.user)
})

router.post('/users/login',async (req,res)=>{
    try {
        const user  = await User.findByCredentials(req.body.email,req.body.password)
        if(!user) return res.send('Invalid credentials')
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post("/users",async (req,res)=> {
    const user =new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    } catch (error) {
        
        res.status(400).send(error)
    }
})
//updates the user
router.patch('/users/me',auth,async (req,res)=>{ 
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
    if(!isValidOperation) return res.status(400).send({error: 'invalid Update!!'})
    const user = req.user
    try {
        updates.forEach( (update)=> { user[update] = req.body[update]  })
        await user.save()
        // const user = await User.findByIdAndUpdate(userId, req.body, {new:true, runValidators: true})
        // if(!user) return res.status(404).send('No user found with that id') we are sure that user exists thanks to auth middleware
        res.send(user)

    } catch (error) {
        res.status(400).send(error)
    }
})
router.delete('/users/me', auth, async (req,res)=>{
    //this userId exists thanks to the auth middleware
    const userId = req.user._id
    try {
        const user = await User.findByIdAndDelete(userId,{})

        res.send(user)
    } catch (error) {
        res.send(error)
    }
})

router.post('/users/logout',auth,async (req,res)=>{
    try {
        //we have access to req.user and req.token thanks to auth middleware
        req.user.tokens = req.user.tokens.filter((token)=> (token.token !== req.token))
        await req.user.save()
        
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll',auth,async (req,res)=>{
    try {
        //we have access to req.user thanks to auth middleware
        req.user.tokens = []
        await req.user.save()
        
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})
//avatars routes:
router.post('/users/me/avatar',auth,upload.single('avatar') ,async (req,res)=>{
    const user = req.user
    user.avatar = req.file.buffer
    await user.save()
    res.send({msg:'file uploaded'})
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})
router.delete('/users/me/avatar',auth,async (req,res)=>{
    const user = req.user
    try {
        delete user.avatar 
        await user.save()
        res.send({msg:'avatar deleted'})
    } catch (error) {
        res.status(500).send()
    }
})



module.exports = router