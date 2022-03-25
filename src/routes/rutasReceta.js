const {Router} = require('express');
const router = Router();
const { body } = require('express-validator');
const validaciones = require('../middleware/authReceta');

// importando el controlador
const controladorReceta = require('../controllers/controllerReceta');

router.get('/', controladorReceta.ListaRecetas);
router.get('/editar', controladorReceta.ObtenerReceta);
router.post('/guardar', validaciones.Validacion, controladorReceta.GuardaReceta);
router.put('/modificar', validaciones.Validacion, controladorReceta.ModificarReceta);
router.delete('/eliminar', controladorReceta.EliminarReceta);

module.exports = router;