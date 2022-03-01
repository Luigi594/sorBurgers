const fs = require('fs');
const path = require('path');
const modeloCliente = require('../models/modelCliente');

const respuesta = (msj, statusCode, id, res) => {

    let mensajes = {
        msj: msj,
        id: id
    }

    res.setHeader("Content-type", "application/json");
    res.statusCod = statusCode;
    res.json(mensajes);

    return respuesta;
}

exports.RecibirImagen = async (req, res) => {

    // filename ya viene definido en postman, o la manera de trabajar el archivo
    const { filename } = req.file;
    const { id } = req.query;

    console.log(filename);

    let buscaCliente = await modeloCliente.findOne({
        where:{
            id: id
        }
    });

    if(!buscaCliente){
        respuesta("El usuario no existe", 200, [], res);
    }
    else{

        const buscaImagen = fs.existsSync(path.join(__dirname, '../public/img/' + buscaCliente.imagen));

        if(!buscaImagen){
            res.json({msj: "La imagen no existe"});
        }
        else{

            try{

                // esto lo que hace es eliminar la imagen del servidor?
                fs.unlinkSync(path.join(__dirname, '../public/img/' + buscaCliente.imagen));
                console.log("La imagen se elimino")
            }
            catch(err){
                console.log(err);
                console.log("La imagen no se elimino")
            }
        }

        buscaCliente.imagen = filename;
        await buscaCliente.save()
        .then((result) => {
            respuesta("Imagen actualizada", 200, [], res);
        })
        .catch((err) => {
            console.log(err);
            res.json({msj: "La imagen no pudo ser eliminada"});
        });
    }
}