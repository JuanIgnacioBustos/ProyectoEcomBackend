import mongoose from "mongoose";
import { productsModel } from './models/products.model.js'

export default class ProductManager {
    connection = mongoose.connect('mongodb+srv://juanignaciobustos7:38410745@coderbackendjb.dkkerkg.mongodb.net/')

    async addProduct(product) {
        try {
        let result = await productsModel.create(product)
        return result
        }
        catch(error) {
        throw new Error("Product code is duplicated")
        }
    }

    async getProducts(limit = null) {
        let result = await productsModel.find({}).limit(limit).lean()
        return result
}

    async getProductById(id) {
        let result = await productsModel.findOne({ _id: id })
        return result
    }

    async updateProduct(id, updatedProduct) {
    let result = await productsModel.updateOne({ _id: id}, { $set: updatedProduct })
    return result
}

    async deleteProduct(id) {
        let result = await productsModel.deleteOne({ _id: id })
        return result
    }
}