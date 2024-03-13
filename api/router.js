const express = require('express')
const router = express.Router()
const { body, param } = require('express-validator')
const homeController = require('./Controllers/HomeController')
const userController = require('./Controllers/UserController')

router.route('/').get(homeController.get)

router.route('/Login').get(userController.get)

router.route('/Inscription').get(userController.inscription)
router.route('/Inscription').post(userController.post)
router.route('/Account').post(userController.login)
router.route('/Account').post(userController.account)


module.exports = router

