const express = require('express');

//Creo que la app de tipo express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// indico donde estan los archivos estaticos
app.use(express.static('public'));

//Acá puedo crear los middlewares//

//Para dar protección al server de excepciones no tratadas.
app.use((err, req, res, next) =>{
    console.error(err.message);
    res.status(500).send('Algo se rompió!!');
});

//Importo las rutas de productos
const router = require('./routes/productos');
app.use('/api',router);

/////////////////////////////////////////////////////

//Traigo el port del environment o lo defino por default
const PORT = process.env.PORT || 8080;

//Levanto el server en el puerto indicado en PORT
const server = app.listen(PORT, ()=>{
    console.log(`servidor corriendo en http://localhost:${PORT}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.error('Error de servidor: ', error);
});

module.exports = server;