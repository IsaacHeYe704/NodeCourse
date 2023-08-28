
const express = require('express')
const path = require('path')
const app = express();
const hbs = require('hbs');
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public/')  
const viewPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")

// Setupp handlebars
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

// serve static directory
app.use(express.static(publicDirectoryPath))
//endpoints
app.get('',(req,res)=> { 
    res.render('index',{ 
        state: 'lluvioso',
        degrees: '25°C',
        locationName: 'Bogota,Colombia'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{ 
        state: 'lluvioso',
        degrees: '25°C',
        locationName: 'Bogota,Colombia'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{ 
        state: 'lluvioso',
        degrees: '25°C',
        locationName: 'Bogota,Colombia'
    })
})

app.get('/weather', (req,res)=>{
    const {address } = req.query
    if(!address) return res.send({error:'you must provide an address'})
    geoCode(address,(error,{latitude,longitud,place_name}={})=>{
        if(error) return res.send({error});
        forecast(latitude,longitud,(forecastError,forecastData)=>{
            if(forecastError) return res.send({error:forecastError});
            console.log(place_name);
            console.log(forecastData);
            res.send({
                place_name,
                forecastData
            })
        })
    })
})
app.get('/products', (req,res)=>{
    const {search} = req.query
    if(!search){
        return res.send({
            error:'you must provide a search term'
        })
    }


    res.send({
        products:[],
        search
    })    
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        error: "We couldnt find the help article you were looking for."
    })
})
//404 page, * is like match anything that hasnt been match
//THIS HAS TO COME AS THE LAST ENDPOINT
app.get('*',(req,res)=>{
    res.render('404',{
        error:"We couldnt find the page you were looking for"
    })
})


app.listen(3000, ()=> {
    console.log('app started');
})











































