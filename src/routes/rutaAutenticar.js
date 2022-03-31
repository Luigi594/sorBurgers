const {Router} = require('express');
const router = Router();
const controllerAuth = require('../controllers/controllerAuth');
const validaciones = require('../middleware/authMiddleware');

// estas son para el login
router.post('/iniciosesion', controllerAuth.Session);
router.post('/sesion-empleado', controllerAuth.SessionEmpleado);
router.get('/error', controllerAuth.Error);

// estas son para el envío de correo
router.post('/recuperarContrasenia', validaciones.ValidarCorreo, controllerAuth.RecuperarContrasenia);
router.put('/comprobarPin', validaciones.ValidarPin, controllerAuth.ComprobarPin);
module.exports = router;