const roteador = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')
roteador.get('/', async (request, response)=>{
    const result = await TabelaFornecedor.listar();
    response.send(JSON.stringify(result));
});

roteador.post('/', async(request,response)=>{
    const dadosRecebidos = request.body;
    const fornecedor = new Fornecedor(dadosRecebidos)
    await  fornecedor.criar()
    response.send(fornecedor);
});
module.exports = roteador;