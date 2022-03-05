const modelVenta = require('../models/modelVenta');
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

// Guardar Venta
exports.GuardarVentas = async (req, res) => {

    //Guardar la Venta
    const { empleadoId, clienteId, fechaVenta, impuesto, subtotal } = req.body;

    await modelVenta.create({
        empleadoId, 
        clienteId, 
        fechaVenta, 
        impuesto, 
        subtotal
    })
    .then((result) => {
        res.status(201).json({msj: "Registro almacenado exitosamente!"});
    })
    .catch((err) => {
        console.log(err);
        res.status(406).json({msj: "El registro no pudo ser guardado"});
    })

}

// Eliminar Venta 
exports.EliminarVenta = async (req, res) => {
    const { id } = req.query;

    //Borrar la Venta
    modelVenta.destroy({
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