const modeloReceta = require('../models/modelReceta');
const { check, validationResult } = require('express-validator');

// listar recetas
exports.ListaRecetas = async (req, res) => {

    const ListaRecetas = await modeloReceta.findAll();

    if(!ListaRecetas.length > 0){
        res.status(200).json({msj: "No hay datos por mostrar"});
    }
    else{
        res.status(200).json({Recetas: ListaRecetas});
    }
}

// guardar datos del receta
exports.GuardaReceta = async (req, res) => {

    const { descripcion } = req.body;

    await modeloReceta.create({
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


// modificar datos del Receta
exports.ModificarReceta = async (req, res) => {

    const { id } = req.query;
    const { descripcion } = req.body;

    let buscaReceta = await modeloReceta.findOne({
        where:{
            id: id
        }
    })

    if(!buscaReceta){
        res.status(404).json({msj: "El id proporcionado no existe"});
    }
    else{
        buscaReceta.descripcion = descripcion;
        await buscaReceta.save()
        .then((result) => {
            res.status(201).json({msj: "Registro modificado exitosamente!"});
        })
        .catch((err) => {
            console.log(err);
            res.status(304).json({msj: "El registro no pudo ser modificado"});
        })
    }
}

// eliminar el Receta
exports.EliminarReceta = async (req, res) => {

    const { id } = req.query;

    await modeloReceta.destroy({
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