const express = require('express')
const router = express.Router()
const { body, param } = require('express-validator')
const homeController = require('./Controllers/HomeController')
const userController = require('./Controllers/UserController')
const MangasController = require('./Controllers/MangasController')

router.route('/').get(homeController.get)

router.route('/Login').get(userController.get)

router.route('/Inscription').get(userController.inscription)

router.route('/Inscription').post(userController.postInscription)

router.route('/Account').post(userController.login)
router.route('/Account').get(userController.account)
router.route('/logout').get(userController.logout)
router.route('/watchlist').get(userController.watchlist)
router.route('/NewsMangas').get(userController.newMangas)






module.exports = router

