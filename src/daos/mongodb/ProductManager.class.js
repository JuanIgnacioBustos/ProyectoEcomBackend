import { productsModel } from './models/products.model.js'

export default class ProductManager {
    async addProduct(product) {
        try {
        let result = await productsModel.create(product)
        return result
        }
        catch(error) {
        throw new Error("Product code is duplicated")
        }
    }

    async getProducts(limit = 10, page = 1, sort = 0, filter = null, filterValue = null) {
        limit = Number(limit)
        page = Number(page)
        sort = Number(sort)

        let filterToApply = {}
        if (filter && filterValue) {
        filterToApply = {[filter]: filterValue} // [filter] es el contenido de la variable "filter"
        }

        let result = await productsModel.paginate(
        filterToApply,
        { limit: limit, page: page, sort: { price: sort }, lean: true }
        )

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