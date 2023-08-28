const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// const API_KEY = "87caba26dc48abbf20af27abe1e72b40"
// const API_URL = "http://api.weatherstack.com/current?access_key=8231e77b6dffd644be24abd37ec88c95&query=New%20York&units=m"


//get location parameter
paramName = '--location'
let location = process.argv.find((param)=>param.split('=')[0] === paramName)
const locationName = location.split('=')[1] 


geoCode(locationName,(error,{latitude,longitud,place_name}={})=>{
    if(error) return console.log(error);
    forecast(latitude,longitud,(forecastError,forecastData)=>{
        if(forecastError) return console.log(forecastError);
        console.log(place_name);
        console.log(forecastData);
    })
})