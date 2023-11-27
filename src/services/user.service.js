import UserManager from "../daos/mongodb/managers/UserMongo.dao.js";
import Mail from "../helpers/mail.js";
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
        // const twoDays = 600000 // TEST (10 minutos)
        const usersToBeDeleted = [] // Array con los ids de los usuarios que se deben borrar
        let mail = new Mail()

        // Vemos cuales usuarios hay que borrar
        for (let user of users) {
        const lastConnection = Number(user.last_connection) // La ultima conexion del usuario (milisegundos)

        const moreThanTwoDays = (lastConnection + twoDays) < Date.now() // 'True' si pasaron mas de 2 dias

        if (moreThanTwoDays) {
            usersToBeDeleted.push(user._id) // Se agrega el usuario a la lista de los que hay que borrar
        }
        }

        // Borramos los usuarios, y les mandamos un mail avisandoles que su cuenta fue borrada
        for (let userId of usersToBeDeleted) {
        let user = await this.findUserById(userId)
        await mail.send(
            user,
            "Account deleted",
            "Tu cuenta ha sido eliminada por inactividad"
        ) // Enviamos el mail

        await this.userDao.deleteUserById(userId) // Eliminamos el usuario
        }
    }

    async deleteUserById(id) {
        await this.userDao.deleteUserById(id)
    }
}