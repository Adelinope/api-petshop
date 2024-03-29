const Modelo = require('./ModeloTabelaFornecedor')
const NaoEncontrado = require('./../erros/NaoEncontrados')
module.exports ={
    listar(){
        return  Modelo.findAll({raw: true});
    },
    
    inserir(fornecedor){
        return Modelo.create(fornecedor);
    },
    async pegarPorId(id){
        const encontrado = await Modelo.findOne({
            where: {
                id:id
            }
        })
        if(!encontrado){
            throw new NaoEncontrado()
        }
        return encontrado
    },
    async atualizar(id, dadosParaAtualizar){
        return Modelo.update(dadosParaAtualizar,{
            where : {id : id}
        })
    },
     remover(id){
        Modelo.destroy({
            where: {id:id}
        })
    }
}