const {Router} = require('express');
const router = Router();
const { body } = require('express-validator');
const validaciones = require('../middleware/authPuestos');

// importando el controlador
const controladorPuestos = require('../controllers/controllerPuestos');

router.get('/', controladorPuestos.ListaPuestos);
router.post('/guardar', validaciones.Validacion, controladorPuestos.GuardaPuestos);
router.put('/modificar', validaciones.Validacion, controladorPuestos.ModificarPuestos);
router.delete('/eliminar', controladorPuestos.EliminarPuestos);

module.exports = router;