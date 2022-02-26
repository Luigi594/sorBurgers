const {Router} = require('express');
const router = Router();
 
// importar controlador
const controladorIngrediente = require('../controllers/controllerIngrediente');

router.get('/', controladorIngrediente.ListarIngredientes);
router.post('/guardar', controladorIngrediente.GuardarIngrediente);
router.put('/modificar', controladorIngrediente.ModificarIngrediente);
router.delete('/eliminar', controladorIngrediente.EliminarIngrediente);

module.exports = router;