const express = require('express')
const router = express.Router()
const { body, param } = require('express-validator')
const homeController = require('./Controllers/HomeController')
const userController = require('./Controllers/UserController')
const MangasController = require('./Controllers/MangasController')
const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})


const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const extension = path.extname(file.originalname).toLowerCase();// recupere l'extention
        const mimetype = file.mimetype;// recupere le mimetype
        if (
            extension !== '.jpg' &&
            extension !== '.jpeg' &&
            extension !== '.png' &&
            extension !== '.webp' &&
            mimetype !== 'image/png' &&
            mimetype !== 'image/jpg' &&
            mimetype !== 'image/jpeg' &&
            mimetype !== 'image/webp'
        ) {
            //on place une variable pour signifier qu'il y a une erreur. 
            req.fileValidationError = 'goes wrong on the mimetype'
            return cb(null, false, new Error('goes wrong on the mimetype'));
        }
        return cb(null, true);
    }
})


// *****************route***************


router.route('/descriptionManga')
    .post(MangasController.search)

router.route('/')
    .get(homeController.get)

router.route('/Login')
    .get(userController.get)
    .post(
        body('email')
        .exists()
        .trim()
        .escape()
        .notEmpty().withMessage('Identifiant érroné')
        .isString().withMessage('Identifiant érroné')
        .isEmail().withMessage('Identifiant érroné'),
         body('password')
        .exists()
        .trim()
        .escape()
        .notEmpty().withMessage('Identifiant érroné')
        .isString().withMessage('Identifiant érroné')
        .isLength({min : 7 }).withMessage('Identifiant érroné')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/),
        userController.login)

    router.route('/Inscription')
    .get(userController.inscription)
    .post(
        body('email')
        .exists()
        .trim()
        .escape()
        .notEmpty().withMessage('Identifiant érroné')
        .isString().withMessage('Identifiant érroné')
        .isEmail().withMessage('Identifiant érroné'),
        body('username')
        .exists()
        .trim()
        .escape()
        .notEmpty().withMessage('Identifiant érroné')
        .isString().withMessage('Identifiant érroné')
        .isLength({min : 5 }).withMessage('Identifiant érroné'),
        body('password')
        .exists()
        .trim()
        .escape()
        .notEmpty().withMessage('Identifiant érroné')
        .isString().withMessage('Identifiant érroné')
        .isLength({min : 7 }).withMessage('Identifiant érroné')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/),
        body('confPassword')
        .exists()
        .trim()
        .escape()
        .notEmpty().withMessage('Identifiant érroné')
        .isString().withMessage('Identifiant érroné')
        .isLength({min : 7 }).withMessage('Identifiant érroné')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/),
         userController.postInscription)



router.route('/Account')
    .get(userController.account)
    .post(userController.login)



router.route('/logout')
    .get(userController.logout)
router.route('/watchlist')
    .get(userController.watchlist)

router.route('/NewsMangas')
    .get(MangasController.newMangas)

router.route('/MostPopular')
    .get(MangasController.mostPopular)

router.route('/KindOfMangas')
    .get(MangasController.kindOfMangas)

// router.route('/KindOfMangas/:kind').get(MangasController.kindOfMangas)

router.route('/gestionUsers')
    .get(userController.list)

router.route('/addMangas')
    .get(MangasController.addMangas)



module.exports = router

