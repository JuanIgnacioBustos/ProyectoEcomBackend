import { Router } from "express"
import ProductManager from '../classes/ProductManager.js'
import __dirname from "../utils.js"

let path = __dirname + "/files/products.json"

let productManager = new ProductManager(path)

const router = Router()

router.get('/', async (req, res) => {
  let limit = Number(req.query.limit)

  let products = await productManager.getProducts(limit)

  res.send({products})
})

router.get('/:pid', async (req, res) => {
  let id = parseInt(req.params.pid)

  let product = await productManager.getProductById(id)

  if (!product) {
    res.send("No se encontró el producto")
    return
  }

  res.send(product)
})

export default router