const express = require('express')
const router = express.Router()
const homeController = require('./Controllers/HomeController')
const userController = require('./Controllers/UserController')

router.route('/').get(homeController.get)

router.route('/Login')
    .get(userController.get)
router.route('/user/create')
    .post(userController.create)
    
module.exports = router

