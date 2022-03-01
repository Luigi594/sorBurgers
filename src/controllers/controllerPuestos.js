const modeloPuestos = require('../models/modelPuestos');
const { check, validationResult } = require('express-validator');

// listar Puestos
exports.ListaPuestos = async (req, res) => {

    const ListaPuestos = await modeloPuestos.findAll();

    if(!ListaPuestos.length > 0){
        res.status(200).json({msj: "No hay datos por mostrar"});
    }
    else{
        res.status(200).json({Puestos: ListaPuestos});
    }
}

// guardar datos del Puestos
exports.GuardaPuestos = async (req, res) => {

    const { descripcion } = req.body;

    await modeloPuestos.create({
        descripcion
    })
    .then((result) => {
        res.status(201).json({msj: "Registro almacenado exitosamente!"});
    })
    .catch((err) => {
        console.log(err);
        res.status(406).json({msj: "El registro no pudo ser guardado"});
    })
}


// modificar datos del Puestos
exports.ModificarPuestos = async (req, res) => {

    const { id } = req.query;
    const { descripcion } = req.body;

    let buscaPuestos = await modeloPuestos.findOne({
        where:{
            id: id
        }
    })

    if(!buscaPuestos){
        res.status(404).json({msj: "El id proporcionado no existe"});
    }
    else{
        buscaPuestos.descripcion = descripcion;
        await buscaPuestos.save()
        .then((result) => {
            res.status(201).json({msj: "Registro modificado exitosamente!"});
        })
        .catch((err) => {
            console.log(err);
            res.status(304).json({msj: "El registro no pudo ser modificado"});
        })
    }
}

// eliminar el Puestos
exports.EliminarPuestos = async (req, res) => {

    const { id } = req.query;

    await modeloPuestos.destroy({
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