import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import taskRoute from './route/task.route.js'

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/task", taskRoute)

mongoose.connect(process.env.MONGODB_URI).then(() =>{
console.log(`db connected ${mongoose.connection.host}`)
}).catch((err) => {
    console.log(err);
})

const port = process.env.PORT || 5000

app.listen(port , () => {
    console.log(`Server running on port ${port}`)
})
