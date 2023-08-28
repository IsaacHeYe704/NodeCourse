const mongoose =require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task =require('./task')
const userSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: true,
        trim:true
    },
    age: {
        type: Number,
        validate(value){
            if(value<0){
                throw new Error("age must be a positive number")
            }
        }
    },
    email: {
        type: String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("the email is not valid")
            }
        }
    }, 
    password: {
        type: String,
        required:true,
        trim:true,
        minlength: 7,
        validate(value ){
            if(value.toLowerCase().includes("password") ) {throw new Error("Password should not contain 'password'")}
        }
    },
    tokens:[{
        token:{
            type:String,
            required: false
        }
    }],
    avatar:{
        type: Buffer
    }
},{
    timestamps: true
})
// virtual relationship with tasks, this is actually not stored in the database
userSchema.virtual('tasks',{
    ref:'Tasks',
    localField:'_id',
    foreignField:'owner'
})
userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() },'supergigamegaSecretDisclosure')

    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token 
}


userSchema.statics.findByCredentials = async function(email,password) { 
    const user = await User.findOne({email})
    if(!user) throw new Error('Unable to login'); 
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch) throw new Error('Unable to login')
    return user
}
userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.tokens
    delete userObject.password
    console.log(userObject);
    return userObject
}

//this is a mongoose midleware
//hashses the plain text password before saving
userSchema.pre('save',async function (next){
    const user = this
    
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }    

    next()
})
//delete user tasks when user is deleted,this is cascade deleting
userSchema.pre('remove',async function(next){
    const user = this
    Task.deleteMany({owner: user._id})
})

const User = mongoose.model('User',userSchema)

module.exports = User



// const me =  new User({
//     name: 'Isaac',
//     age: 22,
//     email:'isaac@gmail.com',
//     password: 'asdaaasdasdasdasdpassword'
// }).save().then(result => console.log('user saved',result))
// .catch(error => console.log('unable to save user',error))
// const mytask = new Tasks({
//     description:'una tarea muy larga',
