import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import useragent from 'express-useragent';
import {adminRouter} from './routers';

console.log("Hi") ;


 
mongoose.connect(
    process.env.DB_URL,
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() =>{console.log('connected to db'); })
    .catch((e) => {
        console.log("Error :",e);
    });
    mongoose.connection.on('connected', () => console.log('Connecteddddddddddddddddddddddddddddddddd'));

const app = express();
app.use(express.json());
app.use(useragent.express());
app.use("/",[adminRouter]);



    

app.listen(4000,() => console.log('up and running on port 4000'));