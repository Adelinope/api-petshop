const TabelaFornecedor = require('./TabelaFornecedor')
class Fornecedor {
        constructor({
            id,
            empresa,
            email,
            categoria,
            dataCriacao,
            dataAtualizacao,
            versao
        }){
            this.id = id
            this.empresa = empresa
            this.email =  email
            this.categoria = categoria
            this.dataCriacao = dataCriacao
            this.dataAtualizacao = dataAtualizacao
            this.versao = versao
        }

        async criar(){
            const resultado = await TabelaFornecedor.inserir({
                 empresa: this.empresa,
                 email: this.email,
                 categoria: this.categoria
            })
            this.id = resultado.id
            this.dataCriacao = resultado.dataCriacao
            this.dataAtualizacao = resultado.dataAtualizacao
            this.versao = resultado.versao
        }

        async carregar(){
            const fornecedorEncontrado = await TabelaFornecedor.pegarPorId(this.id)
            this.empresa = fornecedorEncontrado.empresa
            this.email= fornecedorEncontrado.email
            this.categoria = fornecedorEncontrado.categoria
            this.dataAtualizacao = fornecedorEncontrado.dataAtualizacao
            this.versao = fornecedorEncontrado.versao
            this.dataCriacao = fornecedorEncontrado.dataCriacao
        }

        async atualizar(){
            await TabelaFornecedor.pegarPorId(this.id)
            const campos = ['empresa', 'email', 'categoria']
            const dadosParaAtualizar = {}

            campos.forEach((campo) =>{
                const valor = this[campo]
                console.log(campo)
                if(typeof valor === 'string' && valor.length > 0 ){
                    console.log(campo)
                    dadosParaAtualizar[campo] =  valor
                }
            })
            if(Object.keys(dadosParaAtualizar).length === 0){
                throw new Error ('Não Foram fornecidos dados para atualizar')
            }
            await TabelaFornecedor.atualizar(this.id, dadosParaAtualizar)
        }
}

module.exports = Fornecedor