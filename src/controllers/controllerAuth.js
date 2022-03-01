const passport = require('../configuration/passport');
const modeloUsuario = require('../models/modelUsuario');
const email = require('../configuration/email');

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
    const pin = '1234';

    let buscaCorreo = await modeloUsuario.findOne({
        where:{
            correo: correo
        }
    });

    if(!buscaCorreo){

    }
    else{

        // estos datos se mandan al archivo email
        const data = {
            correo: correo,
            pin: pin
        }

        if(email.RecuperacionContrasenia(data)){

            // aquí me vale, voy a usar este JAJA
            respuesta("Correo enviado", 200, [], res);
        }
        else{
            respuesta("Problema al enviar el correo", 400, [], res);
        }
    }
}

// este sirve para llenar el control de quienes entran a X lugar de la aplicación
exports.Autenticado = passport.Autenticacion;

exports.Session = async (req, res) => {

    const { correo, contrasenia } = req.body;
    const buscaUsuario = await modeloUsuario.findOne({
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
            
            respuesta("Crendenciales incorrectas", 400, [], res);
        }
        else{

            // sii existe el usuario, buscamos la propiedad de id
            // para generar el token
            const token = passport.JsonWebToken(buscaUsuario.id);
            const data = {
                token: token,
                data: buscaUsuario.correo
            };

            respuesta(`Bienvenido ${data.data}`, 200, data.token, res);
        }
    }
}

exports.Error = (req, res) => {
    respuesta("Debe estar autenticado", 400, [], res);
}