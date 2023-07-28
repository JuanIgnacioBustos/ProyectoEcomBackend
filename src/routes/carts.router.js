import { Router } from "express";
import CartManager from "../daos/mongodb/CartManager.class.js";
import __dirname from "../utils.js";

let cartManager = new CartManager()

const router = Router();

router.get('/', async (req, res) => {
    let carts = await cartManager.getCarts()

    res.send(carts)
})

router.get('/:cid', async (req, res) => {
    let id = req.params.cid

    let cart = await cartManager.getCartById(id)

    if (!cart) {
        res.send("No se encontró el carrito")
        return
    }

    res.send(cart.products)
})

router.post('/', async (req, res) => {
    await cartManager.createCart()

    res.send({status: "success"})
})

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        let cartId = req.params.cid
        let productId = req.params.pid

        await cartManager.addProductToCart(cartId, productId)

        res.send({status: "success"})
    }
    catch(error) {
        res.status(400).send({status: "failure", details: error.message})
    }
})

export default router