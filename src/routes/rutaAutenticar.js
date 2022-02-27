const {Router} = require('express');
const router = Router();
const controllerAuth = require('../controllers/controllerAuth');

router.post('/iniciosesion', controllerAuth.Session);

module.exports = router;