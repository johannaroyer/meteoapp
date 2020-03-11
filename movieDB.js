const express = require("express")
const movieDB = express()
const axios = require("axios")

const API_KEY_MOVIE = "a364334712f06f8df8dcfed82a17b1a1"

movieDB.set("view engine", "ejs")

movieDB.get("/", function(req, res){
    let random_movie_id = Math.floor(Math.random() * 5500)
    axios.get(`https://api.themoviedb.org/3/movie/${random_movie_id}?api_key=${API_KEY_MOVIE}&language=en-US&page=1`)
    .then(response => {
        console.log(response.data)
        res.render("index", { movie: response.data})
    })
})

movieDB.listen(1200)