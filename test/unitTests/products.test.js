import chai from "chai";
import connectDB from "../../src/db.js";
import config from "../../src/config.js";
import ProductService from "../../src/services/products.service.js";
import mongoose from "mongoose";

describe("Unit Testing Products", function() {

    this.timeout(10000) // Setea un tiemout general

    // Antes de ejecutar todos los tests unitarios

    before(async function() {
        this.timeout(10000) // Setea el timeout solo para el before (no se si es necesario)

        this.connection = await connectDB(config.MONGO_URL_TEST)
        this.collections = await mongoose.connection.db.collections();
        this.productService = new ProductService()

        console.log("Se ejecuta el before antes de los tests unitarios de productos")
    })

    // Luego de ejecutar todos los tests unitarios

    after(async function() {
        await mongoose.disconnect()
        console.log("Se cerro la conexion en Products Test")
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

    // Tests unitarios de productos

    it('Al obtener los productos, existe un atributo docs, y es un array vacio', async function() {
        let products = await this.productService.getProducts()

        return chai.expect(products).to.have.property('docs').and.to.be.empty
    })

    it('Se agrega un producto a la base de datos', async function() {
        let mockProduct = {
        title: "Limón",
        description: "Soy un limón",
        price: 38,
        thumbnails: [
            'limon_img'
        ],
        code: 1,
        stock: 7,
        category: "Frutas",
        status: true
        }

        await this.productService.addProduct(mockProduct)

        let products = await this.productService.getProducts()

        return chai.expect(products).to.have.property('docs').and.to.have.length(1)
    })

    it('Se agrega un producto y se modifica su stock', async function() {
        let mockProduct = {
        title: "Limón",
        description: "Soy un limón",
        price: 38,
        thumbnails: [
            'limon_img'
        ],
        code: 1,
        stock: 7,
        category: "Frutas",
        status: true
        }

        await this.productService.addProduct(mockProduct)

        let product = await this.productService.getProductByCode(1)

        chai.expect(product).to.have.property("stock").and.to.be.equal(7) // Verificamos que el stock es 7

        await this.productService.updateProduct(product._id, {stock: 91})

        product = await this.productService.getProductByCode(1)

        return chai.expect(product).to.have.property("stock").and.to.be.equal(91) // El stock ahora es 91
    })
})