const express = require("express")
const app = express()
const axios = require("axios")

app.set("view engine", "ejs")

// const pokemonFaker = {
//     name: "faker",
//     id: 300
// }

app.get("/", function(req, res){

    axios.get("https://pokeapi.co/api/v2/pokemon/ditto/")
    .then(response => {
        console.log(response)
        res.render("index", { pokemon: response.data })
    })

    // res.render("index", {pokemon: pokemonFaker })

})

app.get("/contact", function(req, res){
    res.render("pages/contact")
})

app.listen(3000)