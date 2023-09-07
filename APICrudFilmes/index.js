const express = require('express')
const mongoose = require('mongoose')
const Filmes = require('./models/Filmes')

const app = express()

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())
app.post('/filme', async (req, res) => {
    const { titulo, sinopse, duracao, dataLancamento, imagem, categorias } = req.body
    const filme = {
        titulo, 
        sinopse, 
        duracao, 
        dataLancamento, 
        imagem, 
        categorias
    }
    try {
      await Filmes.create(filme)
      res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })

  app.get('/filme', async (req, res) => {
    try {
      const filmes = await Filmes.find()
      res.status(200).json(filmes)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })  

  app.get('/filme/:id', async (req, res) => {
    const id = req.params.id
    try {
      const filme = await Filmes.findOne({ _id: id })
      if (!filme) {
        res.status(422).json({ message: 'Usuário não encontrado!' })
        return
      }
      res.status(200).json(filme)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })

  app.patch('/filme/:id', async (req, res) => {
    const id = req.params.id
    const { titulo, sinopse, duracao, dataLancamento, imagem, categorias } = req.body
    const filme = {
        titulo, 
        sinopse, 
        duracao, 
        dataLancamento, 
        imagem, 
        categorias
    }
    try {
      const updatedFilme = await Person.updateOne({ _id: id }, filme)
      if (updatedFilme.matchedCount === 0) {
        res.status(422).json({ message: 'Usuário não encontrado!' })
        return
      }
      res.status(200).json(filme)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })

  app.delete('/filme/:id', async (req, res) => {
    const id = req.params.id
    const filme = await Filmes.findOne({ _id: id })
    if (!filme) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }
    try {
      await Filmes.deleteOne({ _id: id })
      res.status(200).json({ message: 'Usuário removido com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  }) 
app.get("/", (req, res) => {  //criando a rota - endpoint
    res.json({ message: "Oi Express!" });
  });
    mongoose.connect(
      'mongodb+srv://sangrecco:VAgIFFlCNGWXTU4b@aulamongo.0ojpawn.mongodb.net/Filmes?retryWrites=true&w=majority',
    )
    .then(() => {
      console.log('Conectou ao banco!')
      app.listen(3000)
    })
    .catch((err) => console.log(err))
