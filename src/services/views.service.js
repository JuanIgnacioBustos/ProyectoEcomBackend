import ProductService from "./products.service.js";
import CartService from "../services/cart.service.js";
import UserService from "../services/user.service.js"

export default class ViewService {

    constructor() {
        this.productService = new ProductService()
        this.cartService = new CartService()
        this.userService = new UserService
    }

    async getProducts(limit, page, sort, filter, filterValue) {
        let products = await this.productService.getProducts(limit, page, sort, filter, filterValue)

        return products
    }

    async getAllProductsFromCart(cartId) {
        let products = await this.cartService.getAllProductsFromCart(cartId)

        return products
    }

    async getUserById(userId) {
        let user = await this.userService.findUserById(userId)

        return user.toObject()
    }

    async getAllUsers() {
        let users = await this.userService.getAllUsers()
        
        users = users.map((user) => user.toObject())

        //console.log(users)

        return users
    }
}