const nodemailer = require('nodemailer');

function enviar_email(destinatario, asunto, texto_mensaje) {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mbensan.test@gmail.com',
            pass: "mbensan.2022",
        }
    })

    //Envia el correo
    const options = {
        from: 'mbensan.test@gmail.com',
        to: destinatario,
        subject: asunto,
        html: texto_mensaje
    }

    transporter.sendMail(options, function() {
        console.log('Correo enviado');
    })
}


module.exports = enviar_email;