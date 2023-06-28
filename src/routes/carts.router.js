import { Router } from "express";
import CartManager from "../classes/CartManager.class.js";
import __dirname from "../utils.js";

let path = __dirname + "/files/carts.json"

let cartManager = new CartManager(path)

const router = Router();

router.post('/', async (req, res) => {
    cartManager.createCart()

    res.send({status: "success"})
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

export default router