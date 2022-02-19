const express = require('express');
const enviar_email = require('./email.js');
const app = express();
const axios = require('axios');
app.use(express.static('static'));
const fs = require('fs');
const uuid = require('uuid');

app.get('/email', async(req, res) => {
    //Recuperar datos del formulario
    const destinatarios = req.query.destinatarios;
    const asunto = req.query.asunto;
    const contenido = req.query.contenido;

    //Recuperar info financiera directamente desde la API
    const infoPesos = await axios.get("https://mindicador.cl/api");

    const contenido_correo =
        `El valor del dolar el día de hoy es: ${infoPesos.data.dolar.valor} <br>
             El valor del euro el día de hoy es: ${infoPesos.data.euro.valor} <br> 
             El valor del uf el día de hoy es: ${infoPesos.data.uf.valor} <br>
             El valor del utm el día de hoy es: ${infoPesos.data.utm.valor}`;


    const basecontenido = contenido.concat("<br>" + contenido_correo);

    //Envia el correo
    enviar_email(destinatarios, asunto, basecontenido);

    //crea un identificador
    const id = uuid.v4();

    //crea el archivo y lo guarda en la carpeta correos
    fs.appendFile(`./correos/${id}.txt`, `${basecontenido}`, (error) => {
        if (error) {
            throw error;
        }

        console.log("El archivo a sido creado exitosamente");
    })

    //res.send('Email enviado con éxito');
    res.redirect('/');
})

app.listen(3000, () => {
    console.log('servidor ejecutando');
})