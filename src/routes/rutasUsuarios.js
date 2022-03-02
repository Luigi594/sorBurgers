const {Router} = require('express');
const router = Router();
const validaciones = require('../middleware/authMiddleware');

// importando el controlador
const controladorUsuario = require('../controllers/controllerUsuario');
const controladorAutenticacion = require('../controllers/controllerAuth');

router.get('/', controladorAutenticacion.Autenticado, controladorUsuario.ListaUsuariosClientes);
router.get('/empleados', controladorUsuario.ListaUsuariosEmpleados);

// este es para guardar el usuario del cliente
router.post('/guardar/cliente', validaciones.ValidarUsuario, controladorUsuario.GuardarUsuarioCliente);
router.put('/modificar/cliente', validaciones.ValidarUsuario, controladorUsuario.ModificarCuentaCliente);

module.exports = router;