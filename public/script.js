const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement)

const latitude = ""
const longitude = ""
const promise = new Promise(function () {
    let place = searchBox.getPlaces()[0]
    resolve(place)
})

promise.then(function (data) {
    console.log(data)
    latitude = data.geometry.location.lat()
    longitude = data.geometry.location.lng()
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
    }).then(res => res.json()).then(data => {
        console.log(data)
        setWeatherData(data, place.formatted_address)
    })
})

// searchBox.addListener('places_changed', function () {
//     const place = searchBox.getPlaces()[0]
//     if (place == null) return
//     const latitude = place.geometry.location.lat()
//     const longitude = place.geometry.location.lng()
//     fetch('/weather', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         },
//         body: JSON.stringify({
//             latitude: latitude,
//             longitude: longitude
//         })
//     }).then(res => res.json()).then(data => {
//         console.log(data)
//         setWeatherData(data, place.formatted_address)
//     })
// })

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
    mvdb.textContent = data.icon
}



// function setMovie(data, place) {
   