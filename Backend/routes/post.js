// /fichier qui contient uniquement la logique de routine

// Importation des modules
const express = require('express');//Server
const router = express.Router();

const multer = require('../middlewares/multer-config');

const auth = require('../middlewares/auth');

// Controleur pour associer les differentes routes
const postCtrl = require('../controllers/post');

//Routes

// Creation du post avec l'auth et multer
router.post('/', multer, postCtrl.createPost);
router.put('/:id', postCtrl.createPostText);
router.get('/', postCtrl.getAllPost);
router.get('/:id', postCtrl.getOnePost);
router.put('/postImg/:id', multer, postCtrl.modifImgpost);
router.put('/postText/:id', postCtrl.modifTextpost);
router.delete('/:id', postCtrl.deleteOnePost);


module.exports = router;
