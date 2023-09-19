import UserManager from "../daos/mongodb/managers/UserManager.class.js";

export default class UserService {

    constructor() {
        this.userDao = new UserManager()
    }

    async addUser(newUser) {
        await this.userDao.addUser(newUser)
    }

    async findUser(email) {
        let user = this.userDao.findUser(email)

        return user
    }

    async updatePassword(email, newPassword) {
        await this.userDao.updatePassword(email, newPassword)
    }
}