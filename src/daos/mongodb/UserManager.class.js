import { userModel } from "./models/users.model.js";

export default class UserManager {
    async addUser(user) {
        try {
        let result = await userModel.create(user)

        return result
        }
        catch(error) {
        throw new Error("User couldn't be created")
        }
    }

    async findUser(email) {
        let result = await userModel.findOne({email: email})

        return result
    }
}