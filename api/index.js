const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
const fornecedores = require('./rotas/fornecedores');
const config = require('config');
const { response } = require('express');
const NaoEncontrado = require('./rotas/erros/NaoEncontrados')
const CampoInvalido = require('./rotas/erros/CampoInvalido')
const DadosNaoFornecidos = require ( './rotas/erros/DadosNaoFornecidos')
const ValorNaoSuportado = require('./rotas/erros/ValorNaoSuportado')
const formatosAceitos = require('./Serializador').formatosAceitos
const SerializadorErro = require('./Serializador').SerializadorErro
app.use(bodyParser.json());

app.use((request, response, proximo) => {
    let formatoRequisitado = request.header('Accept')
    if(formatoRequisitado === '*/*'){
        formatoRequisitado = 'application/json'
    }
    if(formatosAceitos.indexOf(formatoRequisitado)===-1){
        response.status(406)
        response.end()
        return
    }
    response.setHeader('Content-Type',formatoRequisitado)
    proximo()
})
app.use('/api/fornecedores',fornecedores);

app.use((err, request, response, proximo)=>{
    let status = 500
    if(err instanceof NaoEncontrado){
       status = 404
    }
    if (err instanceof CampoInvalido || err instanceof DadosNaoFornecidos){
        status = 400
    }
    if(err instanceof ValorNaoSuportado){
        status = 406
    }

    const serializador =  new SerializadorErro(
        response.getHeader('Content-Type')
    )
    response.status(status)
    response.send(
        serializador.serialziar({
            mensagem:err.message, 
            id : err.idErro
        })
    )
})
app.listen(config.get('api.porta'), ()=>{console.log('api funcionando')});