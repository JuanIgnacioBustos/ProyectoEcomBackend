import { cartsModel } from "./models/carts.model.js";
import ProductManager from "./ProductManager.class.js";

export default class CartManager {
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
        try {
        const cart = await this.getCartById(cid)

        let product = cart.products.find((prod) => prod.product._id.toString() === pid ) // Es el producto, si existe

        if (!product) {
            let newProduct = await this.productManager.getProductById(pid)

            cart.products.push({ product: newProduct, quantity: 1 })
        }
        else {
            product.quantity += 1 // Como el producto ya existe, solo incremento su cantidad en 1
        }
        
        await cart.save()

        return
        } 
        catch(error) {
        throw new Error("Product does not exist")
        }
    }

}