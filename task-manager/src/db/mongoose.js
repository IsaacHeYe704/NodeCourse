const mongoose =require('mongoose')
// this file actually just connects to the database
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-db',{ 
    useNewUrlParser:true,

})


// })
// mytask.save()
// .then(result => console.log(result))
// .catch(error => console.log(error))
