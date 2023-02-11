import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import useragent from 'express-useragent';
import {adminRouter,userRouter, productRouter,orderRouter} from './routers';
import cors from 'cors';

console.log("Hi") ;
const corsOptions={
    origin:["http://157.90.108.145:4000/",
        "http://91.251.68.132:3000/",
        "http://192.168.1.17:3000",
        "http://192.168.1.16:3000",
        "http://localhost:3000",],
    methods: ['GET','POST',"PUT","DELETE"]
}


 
mongoose.connect(
    process.env.DB_URL,
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() =>{console.log('connected to db'); })
    .catch((e) => {
        console.log("Error :",e);
    });

const app = express();
app.use(cors(corsOptions));
app.use('/static',express.static('images'))
app.use(express.json());
app.use(useragent.express());
app.use("/api/",[adminRouter,userRouter,productRouter,orderRouter]);



    

app.listen(4000,() => console.log('up and running on port 4000'));