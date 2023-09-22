import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/users.js';
import sayingsRouter from './routes/sayings.js';
import { tagsRouter } from './routes/tags.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors())
app.use("/auth", userRouter);
app.use("/sayings", sayingsRouter)
app.use("/tags", tagsRouter)

mongoose.connect(
    process.env.MONGO_CONNECTION_STRING
)
.then((res)=>console.log("Connected to Database"))
.catch(()=>"Error Connecting to Database")
 
app.listen(8080, () => console.log("Jari Server Started!!!")); 