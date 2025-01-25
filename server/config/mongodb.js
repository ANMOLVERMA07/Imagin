import mongoose from "mongoose";

export const connectDB = async() => {
    await mongoose.connect(`${process.env.MONGODB_URI}/imagin`)
                  .then(() => console.log("MONGODB CONNECTED SUCCESSFULLY"))
                  .catch((e) => console.log("MONGODB CONNECTION ERROR",e))
}