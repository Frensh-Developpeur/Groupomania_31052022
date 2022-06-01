// Express
const express = require('express');

// Routeur
const router = express.Router();

const multer = require('../middlewares/multer-config');

const auth = require('../middlewares/auth');

// Controleur pour associer les differentes routes
const usersCtrl = require('../controllers/users');



// Creation de deux routes de type post
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.get('/:id',auth, usersCtrl.espaceUserOne);
router.get('/admin/:id', usersCtrl.espaceUserOne);
router.delete('/:id',auth, multer, usersCtrl.deleteUserOne);
router.put('/:id',auth, usersCtrl.modifyUser);
router.put('/img/:id', multer, usersCtrl.modifyUserImg);

// Exportation du router 
module.exports = router;