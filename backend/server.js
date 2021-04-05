import express from 'express'
import cors from 'cors'

import { products } from './data'

const app = express()
app.use(cors())

app.get('/api/products', (req, res) => {
  res.send(products)
})

app.get('/api/products/:id', (req, res) => {
  const product = products.find(x => x._id === req.params.id);
  if(product) {
    res.send(product)
  } else {
    res.status(404).send({ message: 'Product not Found' })
  }
  
})





app.listen(5000, () => {
  console.log('server at http://localhost:5000')
})

