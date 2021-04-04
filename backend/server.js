import express from 'express'
import cors from 'cors'

import { products } from './data.js'

const app = express()
app.use(cors())

app.get('/api/products', (req, res) => {
  res.send(products)
})

app.listen(5000, () => {
  console.log('server at http://localhost:5000')
})

