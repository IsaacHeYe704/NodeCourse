const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req,res,next)=>{
    try {
       //get the header value
       const token = req.header('Authorization').replace('Bearer ','')
       //verify if token is valid
       const decoded = jwt.verify(token,'supergigamegaSecretDisclosure')
       const {_id} = decoded
       const user = await User.findOne({_id, 'tokens.token': token})
       if(!user){
        throw new Error()
       }
       //setting the important info into the request so it can be access later
       req.token = token
       req.user = user
       next()

    } catch (error) {
        console.log('jum',error);
        res.status(401).send({error:"Please authenticate. "})
    }
}
module.exports ={auth}