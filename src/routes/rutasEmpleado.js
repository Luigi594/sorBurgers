const {Router} = require('express');
const router = Router();

// importando el controlador dku
const controladorEmpleado = require('../controllers/controllerEmpleado');
const validaciones = require('../middleware/authMiddleware');

router.get('/', controladorEmpleado.ListaEmpleados);
router.post('/guardar', validaciones.Validacion, controladorEmpleado.GuardarEmpleado);
router.put('/modificar', validaciones.Validacion, controladorEmpleado.ModificarEmpleado);
router.get('/editar', controladorEmpleado.ObtenerEmpleados);

module.exports = router;