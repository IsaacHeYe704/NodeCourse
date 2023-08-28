console.log('client side javascript file is loaded');

const weatherForm = document.querySelector("form")
const searchInput = document.querySelector("input")
const weatherDescriptionParagraph = document.querySelector(".weather-description") 
const temperatureParagraph = document.querySelector(".temperature") 
const locationParagraph = document.querySelector(".location")
console.log(weatherDescriptionParagraph);
weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    const location  = searchInput.value
    weatherDescriptionParagraph.innerHTML = "LOADING..."
    temperatureParagraph.innerHTML = ""
    locationParagraph.innerHTML = ""
    fetch(`http://localhost:3000/weather?address=${location}`)
    .then((response)=>response.json()).then(
        (data)=> {
            const {error,place_name,forecastData} = data
            if(error){
                weatherDescriptionParagraph.innerHTML = error
                temperatureParagraph.innerHTML = ""
                locationParagraph.innerHTML = ""
                return console.log(error);
            }
            console.log(place_name,forecastData); 
            weatherDescriptionParagraph.innerHTML = (forecastData.weather_descriptions[0])
            temperatureParagraph.innerHTML = forecastData.temperature +"°C"
            locationParagraph.innerHTML = place_name
        }
    )
})
