const {Router} = require('express');
const router = Router();

// El inicio del sitio
router.get('/', (req, res) => {
    res.send("Bienvenido a SorBurgers Restaurant");
});

// aquí van a ir toodas las rutas, de todos los cruds
router.use('/clientes/', require('./rutasCliente')); //ruta de clientes
router.use('/empleados', require('./rutasEmpleado')); // ruta de empleados
router.use('/usuarios/', require('./rutasUsuarios')); // ruta de usuarios
router.use('/ingredientes', require('./rutasIngrediente'));// ruta de ingrediente
router.use('/productos', require('./rutasProducto'));// ruta de productos
router.use('/recetas', require('./rutasReceta'));// ruta de recetas
router.use('/autenticacion', require('./rutaAutenticar')); // ruta para autenticar
router.use('/proveedores',require('./rutasProveedores')); // ruta para Proveedores
router.use('/puestos',require('./rutasPuestos')); // ruta para Puesto
router.use('/archivos', require('./rutasArchivos')); // ruta para imagen 
router.use('/ventas', require('./rutasVenta')); //ruta para ventas
router.use('/ventasdetalle', require('./rutasVentaDetalle')); //ruta para detalles

module.exports = router;