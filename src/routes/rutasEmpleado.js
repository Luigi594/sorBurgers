const {Router} = require('express');
const router = Router();
const { body } = require('express-validator');
const validaciones = require('../middleware/authEmpleados');

// importando el controlador dku
const controladorEmpleado = require('../controllers/controllerEmpleado');

router.get('/', controladorEmpleado.ListaEmpleados);
router.post('/guardar', validaciones.Validacion, controladorEmpleado.GuardarEmpleado);
router.put('/modificar', validaciones.Validacion, controladorEmpleado.ModificarEmpleado);
router.get('/editar', controladorEmpleado.ObtenerEmpleados);

module.exports = router;