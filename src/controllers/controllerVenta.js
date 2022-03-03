const modelVenta = require('../models/modelVenta');
const modelVentaDetalle = require('../models/modelVentaDetalle');
const { check, validationResult } = require('express-validator');

//Listar todas las Ventas
exports.ListarVentas = async (req, res) => {

    const ListaVentas = await modelVenta.findAll();

    if(!ListaVentas.length > 0){
        res.status(200).json({msj: "No hay datos por mostrar"});
    }
    else{
        res.status(200).json({Ventas: ListaVentas});
    }
}

//Listar todos los Detalles de Venta
exports.ListarVentaDetalles = async (req, res) => {

    const ListaVentaDetalle = await modelVentaDetalle.findAll();

    if(!ListaVentaDetalle.length > 0){
        res.status(200).json({msj: "No hay datos por mostrar"});
    }
    else{
        res.status(200).json({DetalleVentas: ListaVentaDetalle});
    }
}

//Listar solo una Venta y su Detalle
exports.ListarVentaUnica = async (req, res) => {

    //Listar solo un Detalle
    const { id } = req.query;
    const ListaVentaUnica = await modelVenta.findOne({
        where:{
            id: id
        }
    });
    if(!ListaVentaUnica.length > 0){
        res.status(200).json({msj: "No hay datos por mostrar"});
    }
    else{
        res.status(200).json({Venta: ListaVentaUnica});
    }

    //Listar el Detalle de solo esa Venta
    const ListaDetalle = await modelVentaDetalle.findAll({
        where:{
            ventaId: id
        }
    });
    if(!ListaDetalle.length > 0){
        res.status(200).json({msj: "No hay datos por mostrar"});
    }
    else{
        res.status(200).json({DetalleVenta: ListaDetalle});
    }

}

// Guardar Venta
exports.GuardarVentas = async (req, res) => {

    //Guardar la Venta
    const { empleadoId, clienteId, fechaVenta, impuesto, subtotal } = req.body;

    await modelVenta.create({
        empleadoId: empleadoId, 
        clienteId: clienteId, 
        fechaVenta: fechaVenta, 
        impuesto: impuesto, 
        subtotal: subtotal
    })
    .then((result) => {
        res.status(201).json({msj: "Registro almacenado exitosamente!"});
    })
    .catch((err) => {
        console.log(err);
        res.status(406).json({msj: "El registro no pudo ser guardado"});
    })

    // SELECT * FROM sorburgers.ventas order by id desc limit 1
    const venta = await modelVenta.findOne({
        attributes: ['id'],
        order: [
            ['id', 'DESC']
        ],
        limit: 1
    })

    //Guardar el Detalle de la Venta
    const id = venta.dataValues.id;
    const { productoId, cantidad, importe } = req.body;

    await modelVentaDetalle.create({
        ventaId: id,
        productoId: productoId, 
        cantidad: cantidad, 
        importe: importe
    })
    .then((result) => {
        res.status(201).json({msj: "Registro almacenado exitosamente!"});
    })
    .catch((err) => {
        console.log(err);
        res.status(406).json({msj: "El registro no pudo ser guardado"});
    })

}

// Eliminar Venta y su Detalle
exports.EliminarVenta = async (req, res) => {

    const { id } = req.query;

    //Borrar el Detalle de la Venta
    await modelVentaDetalle.destroy({
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

            //Borrar la Venta
            await modelVenta.destroy({
                where:{
                    id: id
                }
            })
            .then((result) => {

                if(result == 0){
                    res.status(400).json({msj: "El id proporcionado no existe"});
                }
                else{
                    res.status(200).json({msj: "Registro eliminado satisfactoriamente"});
                }
            })
        }
    })
  
}