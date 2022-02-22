const {Router} = require('express');
const router = Router();

// El inicio del sitio
router.get('/', (req, res) => {
    res.send("Bienvenido a SorBurgers Restaurant");
});

// aquí van a ir toodas las rutas, de todos los cruds
router.use('/clientes/', require('./rutasCliente'));

module.exports = router;