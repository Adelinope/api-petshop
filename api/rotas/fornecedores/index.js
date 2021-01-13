const roteador = require('express').Router();
roteador.use('/', (request, response)=>{
    response.send('Ábacate');
});

module.exports = roteador;