const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement)

searchBox.addListener('places_changed', function () {
    const place = searchBox.getPlaces()[0]
    if (place == null) return
    const latitude = place.geometry.location.lat()
    const longitude = place.geometry.location.lng()
    fetch('/weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            latitude: latitude,
            longitude: longitude
        })
    }).then(res => res.json(
        console.log(res)
    )).then(data => {
        console.log(data)
        setWeatherData(data, place.formatted_address)
    })
})

const icon = new Skycons({ color: '#293349' })
const locationElement = document.querySelector('[data-location]')
const statusElement = document.querySelector('[data-status]')
const temperatureElement = document.querySelector('[data-temperature]')
const precipitationElement = document.querySelector('[data-precipitation]')
const windElement = document.querySelector('[data-wind]')
icon.set('icon', 'clear-day')
icon.play()

const mvdb = document.querySelector('[mvdbtest]')

function setWeatherData(data, place) {
    locationElement.textContent = place
    statusElement.textContent = data.summary
    temperatureElement.textContent = data.temperature
    precipitationElement.textContent = `${data.precipProbability * 100}%`
    windElement.textContent = data.windSpeed
    icon.set('icon', data.icon)
    icon.play()
    // RECUPERER DATA ICONE
    mvdb.textContent = data.icon
}

// TO DO
// If data.icon = clear-day -> code tMDb

const activite = "snow"

if (activite == "sleet") {
    console.log("Movie")
  } else if (activite == "cloudy"){
    console.log("Cocktail")
  } else if (activite == "snow"){
      console.log("Movie")
      $.ajax({
        method: "post",
        url : "/movie",
        data: "response.data",
        success: function(res){
            console.log("**********success************")
            console.log(res)
        },
        error:function(){
            console.log("**********************")
        }
    })
  } else if (activite == "clear-day"){
      console.log("GIF")
  } else if (activite == "clear-night"){
      console.log("GIF")
  } else if (activite == "wind"){
      console.log("Movie")
  } else if (activite == "partly-cloudy-day"){
      console.log ("Cocktail")
  } else if (activite == "fog"){
      console.log ("Cocktail")
  } else if (activite == "partly-cloudy-night"){
      console.log("GIF")
  } else if (activite == "rain"){
      console.log("Movie")
  }

// if (mvdb.textContent == "clear-day") {
//     console.log("voir un film")
//   } else {
//     console.log("autre activité")
//   }
