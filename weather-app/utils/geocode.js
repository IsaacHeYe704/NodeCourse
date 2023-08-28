const request = require('request')

const MAP_BOX_BASE = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
const MAP_BOX_ACCESS = "pk.eyJ1IjoiaWh5NzA0IiwiYSI6ImNsa2Vqem04ZzB6djgzZ28xOHg1Y2ltbTQifQ.M7pEV6bjNIBAw420lvxJyw"

const geoCode = (address,callback)=>{
    const url= MAP_BOX_BASE+ encodeURI(address) +".json?access_token="+MAP_BOX_ACCESS
    request({url,json:true},(error,response)=>{
    if(error){
        callback('Unable to conect to location sevices.',undefined)
        return
    }
    if(response.body.features.length === 0){
        callback('Unable to find location. Try another search.',undefined)
        return
    }
    const data =  response.body
    const {center,place_name} = data.features[0]
    const [longitud,latitude] = center
    callback(undefined,{latitude,longitud,place_name})
})
}

module.exports = geoCode