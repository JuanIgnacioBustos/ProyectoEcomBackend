import { Router } from "express"
import ProductManager from '../daos/mongodb/ProductManager.class.js'

let productManager = new ProductManager()

const router = Router()

router.get('/', async (req, res) => {
  try {
    let limit = req.query.limit
    let page = req.query.page
    let sort = req.query.sort // Si es "1" es ascendente, si es "-1" es descendente (se ordena por precio)
    let filter = req.query.filter // Un ejemplo de filter puede ser "category"
    let filterValue = req.query.filterValue // Un ejemplo de filterValue puede ser "Frutas"

    let products = await productManager.getProducts(limit, page, sort, filter, filterValue)

    let response = {
      status: "success",
      payload: products.docs,
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: products.prevLink,
      nextLink: products.nextLink
    } // Se utiliza el formato pedido por la consigna

    res.send(response)
  }
  catch (error) {
    res.status(400).send({status: "error", details: "There was an error"})
  }
})

router.get('/:pid', async (req, res) => {
  let id = req.params.pid

  let product = await productManager.getProductById(id)

  if (!product) {
    res.send("No se encontró el producto")
    return
  }

  res.send(product)
})

router.post('/', async (req, res) => {
  try {
    let newProduct = req.body

    await productManager.addProduct(newProduct)
    
    const products = await productManager.getProducts()
    req.socketServer.sockets.emit('update-products', products) // Para que se actualicen los productos en tiempo real
  
    res.send({status: "success"})
  }
  catch(error) {
    res.status(400).send({status: "failure", details: error.message})
  }
})

router.put('/:pid', async (req, res) => {
  let id = req.params.pid
  let newProduct = req.body

  await productManager.updateProduct(id, newProduct)

  res.send({status: "success"})
})

router.delete('/:pid', async (req, res) => {
  let id = req.params.pid
  
  await productManager.deleteProduct(id)

  const products = await productManager.getProducts()
  req.socketServer.sockets.emit('update-products', products) // Para que se actualicen los productos en tiempo real

  res.send({status: "success"})
})

export default router