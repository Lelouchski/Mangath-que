const express = require('express')
const router = express.Router()
const homeController = require('./Controllers/HomeController')
const userController = require('./Controllers/UserController')

router.route('/').get(homeController.get)

router.route('/Account').get(userController.get)

module.exports = router

