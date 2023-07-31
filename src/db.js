import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(
        "mongodb+srv://juanignaciobustos7:38410745@coderbackendjb.dkkerkg.mongodb.net/"
        );
        console.log("Conexión exitosa a la base de datos");
    } 
    catch (error) {
        console.error("Error al conectar a la base de datos", error);
    }
};

export default connectDB;