const {Router} = require('express');
const router = Router();
const { body } = require('express-validator');
const validaciones = require('../middleware/authClientes');

// importando el controlador
const controladorCliente = require('../controllers/controllerCliente');

router.get('/', controladorCliente.ListaClientes);
router.post('/guardar', validaciones.Validacion, controladorCliente.GuardarCliente);
router.put('/modificar', validaciones.Validacion, controladorCliente.ModificarCliente);
router.get('/editar', controladorCliente.ObtenerCliente);

module.exports = router;