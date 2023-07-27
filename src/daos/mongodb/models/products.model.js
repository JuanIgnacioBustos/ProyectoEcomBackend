import mongoose from "mongoose";

const collection = 'products';

const ProductSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true
},
    description: {
    type: String,
    required: true
},
    price: {
    type: Number,
    required: true
},
    thumbnails: {
    type: [
        {
        image_url: {
            type: String
        }
    }
],
    default: []
},
    code: {
    type: Number,
    required: true,
    unique: true
},
    stock: {
    type: Number,
    required: true
},
    category: {
    type: String,
    required: true
},
    status: {
    type: String,
    required: true
    }
})

export const productsModel = mongoose.model(collection, ProductSchema)