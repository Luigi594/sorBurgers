const nodemailer = require('nodemailer');

exports.RecuperacionContrasenia = async (data) => {

    const configuracion = {
        from: process.env.EMAIL_APP,
        to: data.correo,
        subject: "Recuperación de contraseña",
        text: `Hola ${data.correo}, este es tu pin: ${data.pin}`
    };

    const transport = nodemailer.createTransport({

        host: process.env.EMAIL_SERVICE,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth:{

            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    transport.verify(async function (error, sucess) {

        if(error){
            console.log(error);
            return false;
        }
        else{
            return sucess;
        }

        return await transport.sendMail(configuracion);
    })
}