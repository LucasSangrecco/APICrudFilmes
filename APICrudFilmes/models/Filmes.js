const mongoose = require('mongoose')
const Filmes = mongoose.model('Filmes', {
    titulo: String, 
    sinopse: String, 
    duracao: String, 
    dataLancamento: String, 
    imagem: String, 
    categorias: String
})
module.exports = Filmes