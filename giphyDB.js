const express = require("express")
const giphyDB = express()
const axios = require("axios")
// var giphy = require('giphy-api')('ykFLQoxrBAUkX7Vd6ZLUIT2yNmaH7ASw');

const API_KEY_GIF = "ykFLQoxrBAUkX7Vd6ZLUIT2yNmaH7ASw"

// giphy.search({
//     q: 'pokemon',
//     rating: 'g'
// }, function (err, res) {
//     // Res contains gif data!
//     console.log(res.data)
// });

giphyDB.set("view engine", "ejs")

giphyDB.get("/", function(req, res){
    axios.get(`http://api.giphy.com/v1/gifs/random?api_key=${API_KEY_GIF}&q=summer&rating=g&limit=1`)
    .then(response => {
        console.log(response)
        res.render("giphyDB.ejs", { 
            random: response.data, 
            gifSrc: response.data.data.image_original_url,
        })
    })
})

giphyDB.listen(2000)