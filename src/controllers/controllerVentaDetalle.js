const modelVentaDetalle = require('../models/modelVentaDetalle');
const modelVenta = require('../models/modelVenta');
const { check, validationResult } = require('express-validator');

//Listar todas los Detalles
exports.ListarDetalles = async (req, res) => {

    const ListaVentaDetalle = await modelVentaDetalle.findAll();

    if(!ListaVentaDetalle.length > 0){
        res.status(200).json({msj: "No hay datos por mostrar"});
    }
    else{
        res.status(200).json({VentasDetalle: ListaVentaDetalle});
    }
}

// Guardar Venta
exports.GuardarDetalles = async (req, res) => {
    // // SELECT * FROM sorburgers.ventas order by id desc limit 1
    const venta = await modelVenta.findOne({
        attributes: ['id'],
        order: [
            ['id', 'DESC']
        ],
        limit: 1
    })

    // //Guardar el Detalle de la Venta
    const id = venta.dataValues.id;
    console.log(id);
    const { productoId, cantidad, importe } = req.body;

    await modelVentaDetalle.create({
        ventaId: id,
        productoId, 
        cantidad, 
        importe
    })
    .then((result) => {
        res.status(201).json({msj: "Registro almacenado exitosamente!"});
    })
    .catch((err) => {
        console.log(err);
        res.status(406).json({msj: "El registro no pudo ser guardado"});
    })
}

//Eliminar Detalle
exports.EliminarDetalles = async (req, res) => {
    const { id } = req.query;

    //Borrar el Detalle de la Venta
    modelVentaDetalle.destroy({
        where:{
            ventaId: id
        }
    })
    .then((result) => {

        if(result == 0){
            res.status(400).json({msj: "El id proporcionado no existe"});
        }
        else{
            res.status(200).json({msj: "Cuenta eliminada satisfactoriamente"});
        }
    })
}