import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from "./routes/user.js";
import bodyParser from 'body-parser';
import authRoute from "./routes/auth.js"

const app= express();
const port= 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

dotenv.config();

async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB Connection successfull")
    }catch(err){
        console.log(err);
        }
}

connectDB();

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);


 



app.listen(port, ()=>{
    console.log(`Server is running on port:${port}`);
    
})