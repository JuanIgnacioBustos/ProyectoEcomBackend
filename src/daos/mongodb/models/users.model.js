import mongoose from 'mongoose'

const collection = 'users'

const schema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
        },
        last_name: {
        type: String,
        required: true
        },
        email: {
        type: String,
        required: true,
        unique: true
        },
        age: {
        type: String,
        required: true
        },
        password: {
        type: String,
        required: true
    },
    // role: {
    //   type: String,
    //   enum: ["user", "admin"],
    //   default: "user"
    // }
})

export const userModel = mongoose.model(collection, schema)