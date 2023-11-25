import UserManager from "../daos/mongodb/managers/UserMongo.dao.js";
import CartService from "../services/cart.service.js"

export default class UserService {

    constructor() {
        this.userDao = new UserManager()
        this.cartService = new CartService()
    }

    async addUser(newUser) {
        let newCart = await this.cartService.createCart()

        let user = await this.userDao.addUser(newUser, newCart)

        return user
    }

    async findUser(email) {
        let user = await this.userDao.findUser(email)

        return user
    }

    async updatePassword(email, newPassword) {
        await this.userDao.updatePassword(email, newPassword)
    }

    async findUserById(id) {
        let user = await this.userDao.findUserById(id)

        return user
    }

    async updateUserRole(id, newRole) {
        await this.userDao.updateUserRole(id, newRole)
    }

    async updateUserLastConnection(id) {
        await this.userDao.updateUserLastConnection(id, Date.now())
    }

    async updateUserDocuments(id, documentationFiles) {
        await this.userDao.updateUserDocuments(id, documentationFiles)
    }

    async getAllUsers() {
        const users = await this.userDao.getAllUsers()

        return users
    }

    async deleteInactiveUsers() {
        const users = await this.getAllUsers()
        const twoDays = 172800000 // Este valor corresponde a 48 horas (en milisegundos)
        const usersToBeDeleted = [] // Array con los ids de los usuarios que se deben borrar

        // Vemos cuales usuarios hay que borrar
        for (let user of users) {
        const lastConnection = Number(user.last_connection) // La ultima conexion del usuario (milisegundos)

        const moreThanTwoDays = (lastConnection + twoDays) < Date.now() // 'True' si pasaron mas de 2 dias

        if (moreThanTwoDays) {
            usersToBeDeleted.push(user._id) // Se agrega el usuario a la lista de los que hay que borrar
        }
        }

        // Borramos los usuarios
        for (let userId of usersToBeDeleted) {
        await this.userDao.deleteUserById(userId)
        }
    }
}