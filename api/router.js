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

router.route('/ProposeNewManga').get(MangasController.getProposition)
router.route('/ProposeNewManga').post(MangasController.postProposition)


router.route('/watchlist').get(userController.watchlist)

router.route('/NewsMangas').get(MangasController.newMangas)

router.route('/MostPopular').get(MangasController.mostPopular)

router.route('/KindOfMangas').get(MangasController.kindOfMangas)

router.route('/KindOfMangas/:kind').get(MangasController.kindOfMangas)

router.route('/gestionUsers').get(userController.list)

router.route('/listAddMangas').get(MangasController.list)







module.exports = router

