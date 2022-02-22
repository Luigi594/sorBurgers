const {Router} = require('express');
const router = Router();

// importando el controlador dku
const controladorEmpleado = require('../controllers/controllerEmpleado');

router.get('/', controladorEmpleado.ListaEmpleados);
router.post('/guardar', controladorEmpleado.GuardarEmpleado);
router.put('/modificar', controladorEmpleado.ModificarEmpleado);
router.delete('/eliminar', controladorEmpleado.EliminarEmpleado);

module.exports = router;