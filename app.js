if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY

const express = require("express")
const app = express()
const axios = require("axios")
const movieDB = express()

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

//TEST API MOVIE

movieDB.get('/', function(req, res){
    res.render('index')
})

movieDB.post('/movie', (req,res) => {
    let random_movie_id = Math.floor(Math.random() * 5200)
    axios.get(`https://api.themoviedb.org/3/movie/${random_movie_id}?api_key=${API_KEY_MOVIE}&language=en-US&page=1`)
    .then(response => {
        console.log(response.data)
        res.render("movieDB", { 
            movie: response.data,
            urlSrc: `https://image.tmdb.org/t/p/w500${response.data.poster_path}`
        })
    })
})

movieDB.post((req,res) => {
    let random_movie_id = Math.floor(Math.random() * 5200)
    axios.get(`https://api.themoviedb.org/3/movie/${random_movie_id}?api_key=${API_KEY_MOVIE}&language=en-US&page=1`)
    .then(response => {
        console.log(response.data)
        res.render("movieDB", { 
            movie: response.data,
            urlSrc: `https://image.tmdb.org/t/p/w500${response.data.poster_path}`
        })
    })
})

app.listen(3000, () => {
    console.log('Serveur lancé')
})
