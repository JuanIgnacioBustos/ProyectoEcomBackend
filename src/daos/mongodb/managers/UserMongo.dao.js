import { userModel } from "../models/users.model.js";

export default class UserManager {

    async addUser(user, cart) {
        try {
        user.cart = cart._id

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

    async findUserById(id) {
        let result = await userModel.findOne({_id: id})

        return result
    }

    async updatePassword(email, newPassword) {
        let user = await userModel.findOne({email});

        if (!user) {
        throw new Error("User wasn't found")
        }

        await userModel.updateOne({_id: user._id}, {$set: {password: newPassword}});
    }
    
    async updateUserRole(id, newRole) {
        let user = await userModel.findOne({_id: id})

        if (!user) {
        throw new Error("User wasn't found")
        }

        await userModel.updateOne({_id: user._id}, {$set: {role: newRole}});
    }

    async updateUserLastConnection(id, lastConnection) {
        await userModel.updateOne({_id: id}, {$set: {last_connection: lastConnection}});
    }

    async updateUserDocuments(id, documentationFiles) {
        let user = await userModel.findOne({_id: id})
        let userDocuments = user.documents

        // Iteramos sobre los documentos que recibimos
        for (let docFile of documentationFiles) {
        let documentUpdated = false // Flag, indicia si el documento se actualizo (sino, se agrega)
        
        let docName = docFile.filename.split("-")[0] // Es el nombre del documento que puede ser:
        // 'identification', 'address', 'accountState'

        // Se itera sobre los documentos del usuario, para ver si ya existia alguno (y actualizarlo)
        for (let userDoc of userDocuments) {
            // Vemos si el documento ya existe
            if (userDoc.name === docName) {
            // Existe. Se actualiza la referencia del documento de user
            userDoc.reference = docFile.path

            documentUpdated = true // Seteamos el flag en true (para indicar que se actualizo el documento)
            break;
            }
        }

        // Vemos si se actualizo el documento (es decir, ya existia anteriormente), sino, se agrega
        if (!documentUpdated) {
            // El documento no existia anteriormente. Se agrega
            let newUserDocument = {
            name: docName,
            reference: docFile.path
            }
            userDocuments.push(newUserDocument)
        }
        }

        // Guardamos los cambios realizados sobre el usuario
        await user.save()
    }
}