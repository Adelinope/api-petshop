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

roteador.get('/:idFornecedor', async (request, response)=>{
    try{
        const id = request.params.idFornecedor
        const fornecedor = new Fornecedor({id:id})
        await fornecedor.carregar()    
        response.send(JSON.stringify(fornecedor))
    }catch(err){
        response.send( JSON.stringify({mensagem: err.message}))
    }
})

roteador.put('/:idFornecedor', async (request, response) => {
   try{
        const id = request.params.idFornecedor
        const dadosRecebidos = request.body
        const dados = Object.assign({}, dadosRecebidos, {id:id})
        const fornecedor = new Fornecedor(dados)
        await fornecedor.atualizar()
        response.end()
   }catch(err){
        response.send(JSON.stringify({mensagem:err.message}))
   }
})

module.exports = roteador;