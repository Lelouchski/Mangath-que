const express = require('express')
const router = express.Router()
const { body, param } = require('express-validator')
const homeController = require('./Controllers/HomeController')
const userController = require('./Controllers/UserController')
const MangasController = require('./Controllers/MangasController')
const multer = require('multer')
const path = require('path')
const followController = require('./Controllers/followController')

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

router.route('/')
    .get(homeController.get)

// Route pour afficher les mangas par genre
router.route('/kinds/:genre').get(MangasController.kindOfMangas)

router.route('/searchResult')
    .post(MangasController.search)

router.route('/descriptionManga/:id')
    .get(MangasController.goDescription)

router.route('/ProposeNewManga')
    .get(MangasController.getProposition)

router.route('/ProposeNewManga')
    .post(upload.single('image_url'), MangasController.postProposition)

router.route('/NewsMangas')
    .get(MangasController.newMangas)

router.route('/NewsMangas/:id')
    .get(MangasController.getupdateManga)

router.route('/NewsMangas/:id')
    .post(MangasController.postUpdateManga)

router.route('/NewsMangas/delete/:id')
    .post(MangasController.deleteMangas)

router.route('/MostPopular')
    .get(MangasController.mostPopular)

router.route('/kinds/:genre')
    .get(MangasController.kindOfMangas)

router.route('/listAddMangas')
    .get(MangasController.getListAddMangas)

router.route('/refuse/manga/:id')
    .post(MangasController.refuseMangaList)

router.route('/accept/manga/:id')
    .post(MangasController.acceptMangaList)

router.route('/confirmListAdd')
    .get(MangasController.getConfirmListAdd)

router.route('/addMangas')
    .get(MangasController.addMangas)

router.route('/addMangas')
    .post(upload.single('image_url'), MangasController.postAddMangas)





router.route('/Login')
    .get(userController.get)

router.route('/Inscription')
    .get(userController.inscription)

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
            .isLength({ min: 5 }).withMessage('Identifiant érroné'),
        body('password')
            .exists()
            .trim()
            .escape()
            .notEmpty().withMessage('Identifiant érroné')
            .isString().withMessage('Identifiant érroné')
            .isLength({ min: 7 }).withMessage('Identifiant érroné')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/),
        body('confPassword')
            .exists()
            .trim()
            .escape()
            .notEmpty().withMessage('Identifiant érroné')
            .isString().withMessage('Identifiant érroné')
            .isLength({ min: 7 }).withMessage('Identifiant érroné')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/),
        userController.postInscription)

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
            .isLength({ min: 7 }).withMessage('Identifiant érroné')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/),
        userController.login)

router.route('/Account')
    .get(userController.account)

router.route('/Account/update/:id')
    .get(userController.getUpdate)
    .post([
        param('id').isInt().withMessage('L\'ID doit être un entier positif'),
        body('password').isEmpty().withMessage('L\'adresse e-mail doit être valide').escape()
    ], userController.postUpdate)

router.route('/Account/updateEmail/:id')
    .post(userController.postUpdateEmail)

router.route('/logout')
    .get(userController.logout)

router.route('/Readlist')
    .get(followController.readlist)

router.route('/gestionUsers')
    .get(userController.list)

router.route('/edit/users/:id')
    .post(userController.updateUser)

router.route('/Readlist/:mangaId')
    .post(followController.postToRead)

// router.route('/inProgress/:mangaId')
//     .post(userController.postInProgress)

// router.route('/alreadyRead/:mangaId')
//     .post(userController.postAlreadyRead)


module.exports = router