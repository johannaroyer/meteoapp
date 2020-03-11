const express = require("express")
const app = express()
const axios = require("axios")

const API_KEY_GIF = "ykFLQoxrBAUkX7Vd6ZLUIT2yNmaH7ASw"

app.set("view engine", "ejs")

// app.get("/", function(req, res){

//     axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php")
//     .then(response => {
//         console.log(response)
//         res.render("index", { random: response.data })
//     })
// })

app.get("/", function(req, res){
    axios.get(`http://api.giphy.com/v1/gifs/random&api_key=${API_KEY_GIF}&tag=sun&rating=g&limit=1`)
    .then(response => {
        console.log(response)
        res.render("index", { gifs: response.data })
    })
})

app.listen(8080)

// axios.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=ykFLQoxrBAUkX7Vd6ZLUIT2yNmaH7ASw&limit=5")