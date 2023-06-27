import express from 'express'
import ProductManager from './classes/ProductManager.js'

const app = express()

let path = "./files/products.json"

let productManager = new ProductManager(path)

app.get('/products', async (req, res) => {
    let limit = Number(req.query.limit)

    let products = await productManager.getProducts(limit)

    res.send({products})
})

app.get('/products/:pid', async (req, res) => {
    let id = parseInt(req.params.pid)

    let product = await productManager.getProductById(id)

        if (!product) {
        res.send("No se encontró el producto")
    return
}

        res.send(product)
})

app.listen(8080, () => console.log("Servidor levantado"))