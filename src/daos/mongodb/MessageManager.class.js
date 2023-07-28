import mongoose from "mongoose";
import { messageModel } from "./models/messages.model.js";

export default class MessageManager {
    connection = mongoose.connect('mongodb+srv://juanignaciobustos7:38410745@coderbackendjb.dkkerkg.mongodb.net/')

    async addMessage(message) {
        let result = await messageModel.create(message)
        return result
    }


}