const roteador = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor');
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor                                                                                                 

roteador.get('/', async (request, response)=>{
    const result = await TabelaFornecedor.listar();
    response.status(200);
    const serializador = new SerializadorFornecedor(response.getHeader('Content-Type'))
    response.send(serializador.serialziar(result));
});

roteador.post('/', async(request,response, proximo)=>{
  try{
    const dadosRecebidos = request.body;
    const fornecedor = new Fornecedor(dadosRecebidos)
    await fornecedor.criar()
    response.status(201)
    const serializador = new SerializadorFornecedor(response.getHeader('Content-Type'))
    response.send(serializador.serialziar(fornecedor));
  }catch(err){
    proximo(err)
  }
});

roteador.get('/:idFornecedor', async (request, response, proximo)=>{
    try{
        const id = request.params.idFornecedor
        const fornecedor = new Fornecedor({id:id})
        await fornecedor.carregar()  
        response.status(200)  
        const serializador = new SerializadorFornecedor(response.getHeader('Content-Type'), ['email','dataCriacao','dataAtualizacao', 'versao'] )
        response.send(serializador.serialziar(fornecedor))
    }catch(err){
       proximo(err)
    }
})

roteador.put('/:idFornecedor', async (request, response, proximo) => {
   try{
        const id = request.params.idFornecedor
        const dadosRecebidos = request.body
        const dados = Object.assign({}, dadosRecebidos, {id:id})
        const fornecedor = new Fornecedor(dados)
        await fornecedor.atualizar()
        response.status(204)
        response.end()
   }catch(err){
       proximo(err)
    }
})

roteador.delete('/:idFornecedor', async (request, response, proximo)=>{
    try{
        const id = request.params.idFornecedor
        const fornecedor = new Fornecedor({id:id})
        await fornecedor.carregar()
        await fornecedor.remover()
        response.status(204)
        response.end()
    }catch(err){
        proximo(err)
    }
})

module.exports = roteador;