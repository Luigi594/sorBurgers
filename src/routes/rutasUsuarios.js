const {Router} = require('express');
const router = Router();
const validaciones = require('../middleware/authMiddleware');

// importando el controlador
const controladorUsuario = require('../controllers/controllerUsuario');
const controladorAutenticacion = require('../controllers/controllerAuth');

router.get('/', controladorAutenticacion.Autenticado, controladorUsuario.ListaUsuariosClientes);
router.get('/editar', controladorUsuario.ObtenerUsuario);
router.get('/empleados', controladorUsuario.ListaUsuariosEmpleados);

// este es para guardar el usuario del cliente
router.post('/guardar/cliente', validaciones.ValidarUsuario, controladorUsuario.GuardarUsuarioCliente);
router.put('/modificar/cliente', validaciones.ValidarUsuario, controladorUsuario.ModificarCuentaCliente);
router.delete('/eliminar', controladorUsuario.EliminarCuentaCliente);

// este es para el empleado
router.post('/guardar/empleado', validaciones.ValidarUsuario, controladorUsuario.GuardarUsuarioEmpleado);
router.put('/modificar/empleado', validaciones.ValidarUsuario, controladorUsuario.ModificarCuentaEmpleado);
router.delete('/eliminar/empleado', controladorUsuario.EliminarCuentaEmpleado);

module.exports = router;