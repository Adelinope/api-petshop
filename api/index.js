const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
const fornecedores = require('./rotas/fornecedores');
const config = require('config');

app.use(bodyParser.json());
app.use('/api/fornecedores',fornecedores);
app.listen(config.get('api.porta'), ()=>{console.log('api funcionando')});