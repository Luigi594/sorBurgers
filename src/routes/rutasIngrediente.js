const {Router} = require('express');
const router = Router();
const { body } = require('express-validator');
const validaciones = require('../middleware/authIngrediente');

// importar controlador
const controladorIngrediente = require('../controllers/controllerIngrediente');

router.get('/', controladorIngrediente.ListarIngredientes);
router.post('/guardar', validaciones.Validacion, controladorIngrediente.GuardarIngrediente);
router.put('/modificar', validaciones.Validacion, controladorIngrediente.ModificarIngrediente);
router.delete('/eliminar', controladorIngrediente.EliminarIngrediente);

module.exports = router;