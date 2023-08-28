const https = require('https')

const MAP_BOX_BASE = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
const MAP_BOX_ACCESS = "pk.eyJ1IjoiaWh5NzA0IiwiYSI6ImNsa2Vqem04ZzB6djgzZ28xOHg1Y2ltbTQifQ.M7pEV6bjNIBAw420lvxJyw"
const url= MAP_BOX_BASE+ 'bogota' +".json?access_token="+MAP_BOX_ACCESS

const request = https.request(url,(response)=>{
    let data = ''
    //data can be streamed in different chunks so we have to listen to that
    response.on('data', (chunk)=>{
        data += chunk.toString()
    })
    response.on('end', ()=> {
        const body  = JSON.parse(data)
        console.log(body);
    })
})
request.on('error', (error)=>{
    console.log('an error', error);
})
request.end()
