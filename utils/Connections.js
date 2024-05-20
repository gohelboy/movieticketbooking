import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

const dbConnection = async () => {
    if (mongoose.connection.readyState) return;

    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
        new Error("Error connecting to MongoDB");
    }
}

export default dbConnection;