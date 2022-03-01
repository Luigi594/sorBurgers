const {Router} = require('express');
const router = Router();
const { body } = require('express-validator');
const validaciones = require('../middleware/authProveedores');

// importando el controlador
const controladorProveedores = require('../controllers/controllerProveedores');

router.get('/', controladorProveedores.ListaProveedores);
router.post('/guardar', validaciones.Validacion, controladorProveedores.GuardaProveedores);
router.put('/modificar', validaciones.Validacion, controladorProveedores.ModificarProveedores);
router.delete('/eliminar', controladorProveedores.EliminarProveedores);

module.exports = router;