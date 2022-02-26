const {Router} = require('express');
const router = Router();
const validaciones = require('../middleware/authMiddleware');

// importando el controlador
const controladorUsuario = require('../controllers/controllerUsuario');

router.get('/', controladorUsuario.ListaUsuariosClientes);
router.get('/empleados', controladorUsuario.ListaUsuariosEmpleados);

// este es para guardar el usuario del cliente
router.post('/guardar/cliente', validaciones.ValidarUsuarioCliente, controladorUsuario.GuardarUsuarioCliente);
router.put('/modificar/cliente', validaciones.ValidarUsuarioCliente, controladorUsuario.ModificarCuentaCliente);

module.exports = router;