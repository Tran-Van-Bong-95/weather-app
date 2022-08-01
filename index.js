//  select all elements
const notification = document.querySelector('.notification')
const icon = document.querySelector('.icon')
const temperatureValue = document.querySelector('.temperature p')
const description = document.querySelector('.description p')
const locationElement = document.querySelector('.location span')

// create weather content
const weather = {}

weather.temperature = {
  unit: 'celsius',
}

// variaable
const KELVIN = 273
const key = '82005d27a116c2880c8f0fcb866998a0'

// check if geographic service available
if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError)
} else {
  notification.getElementsByClassName.display = 'block'
  notification.innerHTML = 'browser does not support geolocation'
}

function showError(error) {
  notification.style.display = 'block'
  notification.innerHTML = `<p> ${error.message} </p>`
}

function setPosition(position) {
  // console.log(position)
  let latitude = position.coords.latitude
  let longitude = position.coords.longitude

  getWeather(latitude, longitude)
}

// get weather from API provider
function getWeather(latitude, longitude) {
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`

  fetch(api)
    .then((result) => {
      const data = result.json()
      return data
    })
    .then((data) => {
      weather.temperature.value = Math.floor(data.main.temp - KELVIN)
      weather.description = data.weather[0].description
      weather.iconId = data.weather[0].icon
      weather.city = data.name
      weather.country = data.sys.country
    })
    .then(() => displayWeather())
}
//  create weather content above
// and then display them

function displayWeather() {
  icon.innerHTML = `<img src="icons/${weather.iconId}.png"/>`
  temperatureValue.innerHTML = `${weather.temperature.value}°<span>C</span>`
  description.innerHTML = weather.description
  locationElement.innerHTML = `${weather.city}, ${weather.country}`
}
// if user blocks geolocation is default display like HTML otherwise it displays weather at your location
// C to F conversion
function celsiusToFahrenheit(temperature) {
  return (temperature * 9) / 5 + 32
}

// when the user clicks on the temperature element
temperatureValue.addEventListener('click', function () {
  if (weather.temperature.value === undefined) return

  if (weather.temperature.unit == 'celsius') {
    let fahrenheit = celsiusToFahrenheit(weather.temperature.value)
    fahrenheit = Math.floor(fahrenheit)

    temperatureValue.innerHTML = `${fahrenheit}°<span>F</span>`
    weather.temperature.unit = 'fahrenheit'
  } else {
    temperatureValue.innerHTML = `${weather.temperature.value}°<span>C</span>`
    weather.temperature.unit = 'celsius'
  }
})
