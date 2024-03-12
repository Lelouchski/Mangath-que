const express = require('express')
const router = express.Router()
const homeController = require('./Controllers/HomeController')
const userController = require('./Controllers/UserController')

router.route('/HomePage').get(homeController.get)
router.route('/Login').get(userController.get)

module.exports = router

