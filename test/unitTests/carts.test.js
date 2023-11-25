import chai from "chai";
import connectDB from "../../src/db.js";
import config from "../../src/config.js";
import CartService from "../../src/services/cart.service.js";
import mongoose from "mongoose";

describe("Unit testing Carts", function() {

  this.timeout(10000) // Setea un tiemout general

  // Antes de ejecutar todos los tests unitarios

    before(async function() {
        this.timeout(10000) // Setea el timeout solo para el before (no se si es necesario)

        this.connection = await connectDB(config.MONGO_URL_TEST)
        this.collections = await mongoose.connection.db.collections();
        this.cartService = new CartService()

        console.log("Se ejecuta el before antes de los tests unitarios de carritos")
    })

    // Luego de ejecutar todos los tests unitarios

    after(async function() {
        await mongoose.disconnect()
        console.log("Se cerro la conexion en Carts Test")
    })

    // Antes de ejecutar cada test unitario

    // beforeEach(function () {
    //   // console.log("Antes de ejecutar cada test, se imprime esto")
    //   this.timeout(5000);
    // })

    // Luego de ejecutar cada test unitario

    afterEach(async function() {
        // console.log("Despues de ejecutar cada test, se imprime esto")
        for (let collection of this.collections) {
        await collection.deleteMany({}) // Se limpian todas las collections despues de cada test
        }
    })

    // Tests unitarios de carts

    it('Al obtener los carritos, al principio es un array vacio', async function() {
        let carts = await this.cartService.getCarts()

        return chai.expect(carts).to.be.empty
    })

    it('Se crea un nuevo carrito', async function() {
        await this.cartService.createCart()

        let carts = await this.cartService.getCarts()

        return chai.expect(carts).to.have.length(1)
    })

    it('Se reemplazan todos los productos de un carrito', async function() {
        let cart = await this.cartService.createCart()

        let products = [
        {    
            product: "648e669847001ac4ac734ff8", // Id random, pero de tipo ObjectId
            quantity: 8
        },
        {
            product: "648e5e743d41e859947979fb",
            quantity: 12
        }
        ]

        await this.cartService.replaceProductsFromCart(cart._id, products)

        cart = await this.cartService.getCartById(cart._id)

        //console.log(cart.products) // Deberia ser 'null' el 'product', ya que el Id es inventado

        return chai.expect(cart.products).to.have.length(2)
    })

})