const express = require('express') 
const { engine, ExpressHandlebars } = require('express-handlebars') 
const router = require('./api/router') 
const app = express() 
const config = require('./config')
const port = 5000 
const path = require('path') 

app.engine('hbs', engine({
    extname: 'hbs'}))

app.set('view engine', 'hbs')

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use('/css', express.static(path.join(__dirname, 'assets/css')))

app.use('/js', express.static(path.join(__dirname, 'assets/js')))

app.use('/assets', express.static(path.join(__dirname, 'assets')));


app.use('/', router)

try {
    config.sequelize.authenticate()
    console.log('Connection has been established successfully.') 
} catch (error) {
    console.error('Unable to connect to the database:', error) 
}

app.listen(port, () => {
    console.log(`Example app listening at: http://127.0.0.1:${port}`) 
})