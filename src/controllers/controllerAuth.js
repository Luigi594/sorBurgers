const passport = require('../configuration/passport');
const modeloUsuario = require('../models/modelUsuario');
const email = require('../configuration/email');
const modeloCliente = require('../models/modelCliente');

// funcion para indicar el header para el token
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

// funcion para el envío de correo
exports.RecuperarContrasenia = async (req, res) => {

    const { correo } = req.body;
    const pin = Math.floor(Math.random() * (9999-1000) + 1000);

    // estos datos se mandan al archivo email
    const data = {
        correo: correo,
        pin: pin
    }

    if(email.RecuperacionContrasenia(data)){

        let buscaCliente = await modeloUsuario.findOne({
            where:{
                correo: correo
            }
        })

        buscaCliente.pin = pin;
        await buscaCliente.save()
        .then((result) => {
            respuesta("Correo enviado", 200, [], res);
        })
        .catch((err) => {
            respuesta("Problema al enviar el correo", 400, [], res);
        });    
    }
}

exports.ComprobarPin = async (req, res) => {

    const { id } = req.query;
    const { pin, contrasenia, confirmar } = req.body;

    let buscaUsuario = await modeloUsuario.findOne({
        where:{
            id: id
        }
    })

    if(!buscaUsuario){
        respuesta("El usuario no existe", 404, [], res);
    }
    else{

        if(confirmar !== contrasenia){
            respuesta("Las contraseñas no son iguales", 200, [], res);
        }
        else{

            buscaUsuario.contrasenia = contrasenia;
            buscaUsuario.pin = null;
            await buscaUsuario.save()
            .then((result) => {
                respuesta("Operacion realizada correctamente", 201, [], res);
            })
            .catch((err) => {
                console.log(err);
                respuesta("Algo salio mal", 304, [], res);
            })
        }   
    }
}

// este sirve para llenar el control de quienes entran a X lugar de la aplicación
exports.Autenticado = passport.Autenticacion;

exports.Session = async (req, res) => {

    const { correo, contrasenia } = req.body;
    const buscaUsuario = await modeloUsuario.findOne({
        include: [{
            model: modeloCliente,
            attributes: ['nombre', 'apellido', 'telefono', 'fechaNacimiento'],
        }],
        where:{
            correo: correo
        }
    })

    if(!buscaUsuario){
        respuesta("Usuario no registrado", 400, [], res);
    }
    else{

        // usamos la verificacion de contrasenia de bcrypt definida en el modelo
        // primero va lo que el usuario le manda, y después el campo definido en el modelo
        if(!buscaUsuario.verificarContrasenia(contrasenia, buscaUsuario.contrasenia)){
            
            respuesta("Credenciales incorrectas", 400, [], res);
        }
        else{

            // sii existe el usuario, buscamos la propiedad de id
            // para generar el token
            const token = passport.JsonWebToken(buscaUsuario.id);

            const persona = await modeloCliente.findOne({
                attributes: ['nombre', 'apellido'],
                where:{ 
                    id: buscaUsuario.id
                }
            });

            const usuario = persona.dataValues.nombre + ' ' + persona.dataValues.apellido;

            const data = {
                token: token,
                usuario: usuario,
                info: buscaUsuario
            };

            respuesta(`Bienvenido ${data.usuario}`, 200, data, res);
        }
    }
}

exports.Error = (req, res) => {
    respuesta("Debe estar autenticado", 400, [], res);
}