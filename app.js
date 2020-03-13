if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const DARKSKY_API_KEY = "113872cb1772c3a491849da8d4bcb9c7"
const API_KEY_MOVIE = "a364334712f06f8df8dcfed82a17b1a1"
const API_KEY_GIF = "ykFLQoxrBAUkX7Vd6ZLUIT2yNmaH7ASw"

const express = require("express")
const app = express()
const axios = require("axios")
const movieDB = express()

app.use(express.json())
app.use(express.static('public'))
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('index')
})


app.post('/weather', (req, res) => {
    const url = `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${req.body.latitude},${req.body.longitude}?units=auto`
    console.log(req.body)
    axios({
        url: url,
        responseType : 'json'
    }).then(data => res.json(data.data.currently))
})

//API MOVIE
app.post('/movie', (req, res) => {
    let random_movie_id = Math.floor(Math.random() * 400)
    console.log(`https://api.themoviedb.org/3/movie/${random_movie_id}?api_key=${API_KEY_MOVIE}&language=en-US&page=1`)
    axios.get(`https://api.themoviedb.org/3/movie/${random_movie_id}?api_key=${API_KEY_MOVIE}&language=en-US&page=1`)
    .then(response => {
        console.log(response.data)
        res.send({ 
            movie: response.data,
            urlSrc: `https://image.tmdb.org/t/p/w500${response.data.poster_path}`
        })
    })
})

//API GIF
app.post('/gifs', (req, res) => {
    console.log(`http://api.giphy.com/v1/gifs/random?api_key=${API_KEY_GIF}&tag=weather&rating=g&limit=1`)
    axios.get(`http://api.giphy.com/v1/gifs/random?api_key=${API_KEY_GIF}&tag=weather&rating=g&limit=1`)
    .then(response => {
        console.log(response.data)
        res.send({  
            gifSrc: response.data.data.image_original_url
        })
    })
})


app.listen(5000, () => {
    console.log('Serveur lancé')
})
