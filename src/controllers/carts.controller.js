import CartService from "../services/cart.service.js";

let cartService = new CartService()

const getCarts = async (req, res) => {
    let carts = await cartService.getCarts()

    res.send(carts)
}

const getCartById = async (req, res) => {
    let id = req.params.cid

    let cart = await cartService.getCartById(id)

    if (!cart) {
        res.send("No se encontró el carrito")
        return
    }

    res.send(cart.products)
}

const createCart = async (req, res) => {
    await cartService.createCart()

    res.send({status: "success"})
}

const addProductToCart = async (req, res) => {
    try {
        let cartId = req.params.cid
        let productId = req.params.pid

        await cartService.addProductToCart(cartId, productId)

        res.send({status: "success"})
    }
    catch(error) {
        res.status(400).send({status: "failure", details: error.message})
    }
}

const deleteProductFromCart = async (req, res) => {
    try {
        let cartId = req.params.cid
        let productId = req.params.pid

        await cartService.deleteProductFromCart(cartId, productId)

        res.send({status: "success"})
    }
    catch(error) {
        res.status(400).send({status: "failure", details: error.message})
    }
}

const deleteAllProductsFromCart = async (req, res) => {
    let cartId = req.params.cid

    await cartService.deleteAllProductsFromCart(cartId)

    res.send({status: "success"})
}

const replaceProductsFromCart = async (req, res) => {
    let cartId = req.params.cid
    let newProducts = req.body

    await cartService.replaceProductsFromCart(cartId, newProducts)

    res.send({status: "success"})
}

const updateProductQuantityFromCart = async (req, res) => {
    let cartId = req.params.cid
    let productId = req.params.pid
    let newQuantity = req.body.quantity

    await cartService.updateProductQuantityFromCart(cartId, productId, newQuantity)

    res.send({status: "success"})
}

export default {
    getCarts,
    getCartById,
    createCart,
    addProductToCart,
    deleteProductFromCart,
    deleteAllProductsFromCart,
    replaceProductsFromCart,
    updateProductQuantityFromCart
}