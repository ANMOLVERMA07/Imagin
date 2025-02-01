import express from "express";
import cors from "cors";
import 'dotenv/config'
import {connectDB} from "./config/mongodb.js";
import userRouter from "./route/userRoute.js";
import imageRouter from "./route/imageRoute.js";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(cors())

app.use('/api/user',userRouter);
app.use('/api/image',imageRouter);
app.get("/",(req,res) => {
    res.send("Hello");
})


app.listen(PORT, async() => {
    console.log(`SERVER IS STARTED AT PORT:${PORT}`);
   await connectDB();
})