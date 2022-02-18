const express = require('express');
const enviar_email = require('./email.js');
const app = express();
const axios = require('axios');
app.use(express.static('static'));
const fs = require('fs');
const uuid = require('uuid');

app.get('/email', async(req, res) => {
    // 1. Recuperar datos del formulario
    const destinatarios = req.query.destinatarios;
    const asunto = req.query.asunto;
    const contenido = req.query.contenido;

    // 2. Recuperar info financiera directamente desde la API
    const infoPesos = await axios.get("https://mindicador.cl/api");

    //console.log(destinatarios, asunto, contenido);

    /*console.log(
        `El valor del dolar el día de hoy es: ${infoPesos.data.dolar.valor} \n 
         El valor del euro el día de hoy es: ${infoPesos.data.euro.valor} \n 
         El valor del uf el día de hoy es: ${infoPesos.data.uf.valor} \n
         El valor del utm el día de hoy es: ${infoPesos.data.utm.valor}`);*/

    const contenido_correo =
        `El valor del dolar el día de hoy es: ${infoPesos.data.dolar.valor} <br>
             El valor del euro el día de hoy es: ${infoPesos.data.euro.valor} <br> 
             El valor del uf el día de hoy es: ${infoPesos.data.uf.valor} <br>
             El valor del utm el día de hoy es: ${infoPesos.data.utm.valor}`;


    //const valores = `${infoPesos.data}`

    //console.log(infoPesos);

    const basecontenido = contenido.concat(" " + contenido_correo);

    enviar_email(destinatarios, asunto, basecontenido);

    const id = uuid.v4();

    fs.appendFile(`./correos/${id}.txt`, `${basecontenido}`, (error) => {
        if (error) {
            throw error;
        }

        console.log("El archivo a sido creado exitosamente");
    })

    res.send('Email enviado con éxito');

})

app.listen(3000, () => {
    console.log('servidor ejecutando');
})















/*const enviar_email = require('./email.js');
const express = require('express');
const app = express();

app.get('/email', (req, res) => {
    //recibe el correo
    enviar_email('j.palma.quezada@gmail.com', 'asunto de correo electrónico', 'Este es el comentario del correo electronico');
    res.send("Email enviado con exito");
});

app.listen(3000, () => {
    console.log("Servidor ejecutando");
})
*/