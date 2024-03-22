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

router.route('/searchResult').post(MangasController.search)
router.route('/descriptionManga/:id').get(MangasController.goDescription)


router.route('/').get(homeController.get)


router.route('/Login').get(userController.get)

router.route('/Inscription').get(userController.inscription)

router.route('/Inscription').post(userController.postInscription)

router.route('/Account').post(userController.login)

router.route('/Account').get(userController.account)

router.route('/Account/update/:id')
    .get(userController.getUpdate)
    .post([
        param('id').isInt().withMessage('L\'ID doit être un entier positif'),
        body('password').isEmpty().withMessage('L\'adresse e-mail doit être valide').escape()
    ],userController.postUpdate)
router.route('/Account/updateEmail/:id').post(userController.postUpdateEmail)
    
    

router.route('/logout').get(userController.logout)

router.route('/ProposeNewManga').get(MangasController.getProposition)
router.route('/ProposeNewManga').post(upload.single('image_url'), MangasController.postProposition)


router.route('/Readlist').get(userController.readlist)


router.route('/NewsMangas').get(MangasController.newMangas)
router.route('/NewsMangas/:id').get(MangasController.getupdateManga)
router.route('/NewsMangas/:id').post(MangasController.postUpdateManga)
router.route('/NewsMangas/delete/:id').post(MangasController.deleteMangas)


router.route('/MostPopular').get(MangasController.mostPopular)

router.route('/kinds/:genre').get(MangasController.kindOfMangas)


router.route('/gestionUsers').get(userController.list)
router.route('/edit/users/:id').post(userController.updateUser)

router.route('/listAddMangas').get(MangasController.getListAddMangas)
router.route('/refuse/manga/:id').post(MangasController.refuseMangaList)
router.route('/accept/manga/:id').post(MangasController.acceptMangaList)

router.route('/confirmListAdd').get(MangasController.getConfirmListAdd)


router.route('/addMangas').get(MangasController.addMangas)
router.route('/addMangas').post(upload.single('image_url'), MangasController.postAddMangas)



module.exports = router