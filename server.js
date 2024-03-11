const express = require('express') 
const session = require('express-session') 
const { engine, ExpressHandlebars } = require('express-handlebars') 
const router = require('./api/router') 
const app = express() 
const port = 5000 
const path = require('path') 
const Handlebars = require("handlebars") 

app.engine('hbs', engine({
    extname: 'hbs'}))

app.set('view engine', 'hbs')

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use('/css', express.static(path.join(__dirname, 'assets/css')))

app.use('/js', express.static(path.join(__dirname, 'assets/js')))

app.use('/assets', express.static(path.join(__dirname, 'assets')));


app.use('/', router)

app.listen(port, () => {
    console.log(`Example app listening at: https://127.0.0.1:${port}`) 
})