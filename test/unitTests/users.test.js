import chai from "chai";
import connectDB from "../../src/db.js";
import config from "../../src/config.js";
import UserService from "../../src/services/user.service.js";
import mongoose from "mongoose";

describe('Unit testing Sessions', function() {
    this.timeout(10000) // Setea un tiemout general

    // Antes de ejecutar todos los tests unitarios

    before(async function() {
        this.timeout(10000) // Setea el timeout solo para el before (no se si es necesario)

        this.connection = await connectDB(config.MONGO_URL_TEST)
        this.collections = await mongoose.connection.db.collections();
        this.userService = new UserService()

        console.log("Se ejecuta el before antes de los tests unitarios de users")
    })

    // Luego de ejecutar todos los tests unitarios

    after(async function() {
        await mongoose.disconnect()
        console.log("Se cerro la conexion en Users Test")
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

    // Tests unitarios de users

    it('Se agrega un usuario', async function() {
        let mockUser = {
        first_name: "Pepe",
        last_name: "Pepon",
        email: "pepe@gmail.com",
        age: 24,
        password: "123"
        }

        await this.userService.addUser(mockUser)

        let user = await this.userService.findUser("pepe@gmail.com")

        return chai.expect(user).to.have.property("_id")
    })

    it('Se actualiza el rol de un usuario', async function() {
        let mockUser = {
        first_name: "Pepe",
        last_name: "Pepon",
        email: "pepe@gmail.com",
        age: 24,
        password: "123"
        }

        let user = await this.userService.addUser(mockUser)

        chai.expect(user).to.have.property("role").and.to.be.equal("user")

        await this.userService.updateUserRole(user._id, "premium")

        user = await this.userService.findUser("pepe@gmail.com")

        return chai.expect(user).to.have.property("role").and.to.be.equal("premium")
    })

    it('Se actualiza la contrasenia de un usuario', async function() {
        let mockUser = {
        first_name: "Pepe",
        last_name: "Pepon",
        email: "pepe@gmail.com",
        age: 24,
        password: "123"
        }

        let user = await this.userService.addUser(mockUser)

        chai.expect(user).to.have.property("password").and.to.be.equal("123")

        await this.userService.updatePassword("pepe@gmail.com", "12345")

        user = await this.userService.findUser("pepe@gmail.com")

        return chai.expect(user).to.have.property("password").and.to.be.equal("12345")
    })

})