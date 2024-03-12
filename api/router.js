const express = require('express')
const router = express.Router()
const { body, param } = require('express-validator')
const homeController = require('./Controllers/HomeController')
const userController = require('./Controllers/UserController')

router.route('/HomePage').get(homeController.get)

router.route('/Login').get(userController.get)

router.route('/Inscription').get(userController.userAccount)
router.route('/Inscription').post(userController.post)

module.exports = router

