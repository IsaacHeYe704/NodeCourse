const request = require('request')
const API_BASE = "http://api.weatherstack.com/current?access_key=8231e77b6dffd644be24abd37ec88c95&query="
const forecast =(latitude,longitud,callback)=>
{
    const url = API_BASE +latitude + ',' + longitud
    request({url ,json:true},(error,response)=>{
    if(error){
        callback('unable to connect to weather service',undefined)
        return
    }
    if(response.body.error){
        callback('Unable to find location',undefined)
        return
    }
    const data =  response.body
    const {temperature, feelslike, weather_descriptions } = data.current
    callback(undefined,{temperature,feelslike,weather_descriptions})
})
}

module.exports = forecast