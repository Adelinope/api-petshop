class ValorNaoSuportado extends Error{
    constructor(contentType){
        super(`O tipo de Conteúdo ${contentType} não é supórtado`)
        this.name = 'ValorNaoSuportado'
        this.idErro = 3
    }
}

module.exports =  ValorNaoSuportado