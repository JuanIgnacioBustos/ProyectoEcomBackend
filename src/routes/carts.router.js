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

export default router