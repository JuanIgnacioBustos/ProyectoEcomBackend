import mongoose from "mongoose";
import { cartsModel } from "./models/carts.model.js";
import ProductManager from "./ProductManager.class.js";

export default class CartManager {
    connection = mongoose.connect('mongodb+srv://juanignaciobustos7:38410745@coderbackendjb.dkkerkg.mongodb.net/')

    productManager = new ProductManager()

    async createCart() {
        const result = await cartsModel.create({ products: [] })
        return result
    }

    async getCartById(id) {
        const result = await cartsModel.findOne({ _id: id }).populate('products.product')
        return result
    }

    async getCarts() {
        const result = await cartsModel.find({})
        return result
    }

    async addProductToCart(cid, pid) {
        const product = await this.productManager.getProductById(pid)
        const cart = await this.getCartById(cid)

        cart.products.push({ product: product })
        await cart.save()

        return
    }

}