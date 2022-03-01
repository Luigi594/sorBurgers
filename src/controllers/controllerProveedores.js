const modeloProveedores = require('../models/modelProveedores');
const { check, validationResult } = require('express-validator');

// listar Proveedores
exports.ListaProveedores = async (req, res) => {

    const ListaProveedores = await modeloProveedores.findAll();

    if(!ListaProveedores.length > 0){
        res.status(200).json({msj: "No hay datos por mostrar"});
    }
    else{
        res.status(200).json({Proveedores: ListaProveedores});
    }
}

// guardar datos del Proveedores
exports.GuardaProveedores= async (req, res) => {

    const { nombreProveedor,empresa,direccion,telefono,correo } = req.body;

    await modeloProveedores.create({
        nombreProveedor,
        empresa,
        direccion,
        telefono,
        correo
    })
    .then((result) => {
        res.status(201).json({msj: "Registro almacenado exitosamente!"});
    })
    .catch((err) => {
        console.log(err);
        res.status(406).json({msj: "El registro no pudo ser guardado"});
    })
}


// modificar datos del Proveedores
exports.ModificarProveedores = async (req, res) => {

    const { id } = req.query;
    const { nombreProveedor,empresa,direccion,telefono,correo } = req.body;

    let buscaProveedores = await modeloProveedores.findOne({
        where:{
            id: id
        }
    })

    if(!buscaProveedores){
        res.status(404).json({msj: "El id proporcionado no existe"});
    }
    else{
        buscaProveedores.nombreProveedor = nombreProveedor;
        buscaProveedores.empresa = empresa;
        buscaProveedores.direccion = direccion;
        buscaProveedores.telefono = telefono;
        buscaProveedores.correo = correo;
        await buscaProveedores.save()
        .then((result) => {
            res.status(201).json({msj: "Registro modificado exitosamente!"});
        })
        .catch((err) => {
            console.log(err);
            res.status(304).json({msj: "El registro no pudo ser modificado"});
        })
    }
}

// eliminar el Proveedores
exports.EliminarProveedores = async (req, res) => {

    const { id } = req.query;

    await modeloProveedores.destroy({
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