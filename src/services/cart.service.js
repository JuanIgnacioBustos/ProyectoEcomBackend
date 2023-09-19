import CartManager from "../daos/mongodb/managers/CartManager.class.js";

export default class CartService {

    constructor() {
        this.cartDao = new CartManager() 
    }

    async getCarts() {
        let carts = await this.cartDao.getCarts()
    
        return carts
    }
    
    async getCartById(id) {
        let cart = await this.cartDao.getCartById(id)
    
        return cart
    }

    async createCart() {
        await this.cartDao.createCart()
    }

    async addProductToCart(cartId, productId) {
        await this.cartDao.addProductToCart(cartId, productId)
    }

    async deleteProductFromCart(cartId, productId) {
        await this.cartDao.deleteProductFromCart(cartId, productId)
    }

    async deleteAllProductsFromCart(cartId) {
        await this.cartDao.deleteAllProductsFromCart(cartId)
    }

    async replaceProductsFromCart(cartId, newProducts) {
        await this.cartDao.replaceProductsFromCart(cartId, newProducts)
    }

    async updateProductQuantityFromCart(cartId, productId, newQuantity) {
        await this.cartDao.updateProductQuantityFromCart(cartId, productId, newQuantity)
    }
}