import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Admin from '../models/admins';
import SlideShow from '../models/slideShow';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const connection = mongoose.connect(process.env.DB_URL, {useNewUrlParser: true , useUnifiedTopology: true});
const slideShowStorage = new GridFsStorage ({url: process.env.DB_URL});
const slideShowUpload = multer({slideShowStorage})




export const adminLogin = (req, res, next) => {
    try {
        console.log("-----AdminLogin-----");
        Admin.findOne({adminUsername: req.body.adminUsername}, ((error, admin) => {
            error ? console.log(error) : admin ? bcrypt.compare(req.body.adminPassword, admin.adminHashedPassword, (error, result) => {
                error ? console.log(error) : result ? jwt.sign({_id: admin._id}, process.env.HASHED, {expiresIn: '20m'}, (error, token) => {
                    error ? console.log(error) : token ? res.header("auth-token", token).send(token) : console.log(token)
                }) : res.status(401).send("your username or password isn't correct")
            }) : res.status(401).send("you are not authorized!")
        }))
    } catch (e) {
        console.log(e)
    }
};



export const adminRegister = async (req, res, next) => {
    try {
        console.log("-----AdminRegister-----");
        const {
            adminName,
            adminUsername,
            adminFamily,
            adminPassword
        } = req.body;
        const HashedPassword = await bcrypt.hash(adminPassword, await bcrypt.genSalt(10));
        Admin.create({
            adminName,
            adminUsername,
            adminFamily,
            adminPassword,
            adminHashedPassword: HashedPassword
        }, (error) => {
            error ? next(error) : res.status(200).send({"message": "submitted!"})
        })
    } catch (e) {
        next(e)
    }
};

export const createSlideShow = async (req, res, next) => {
    try {
        console.log("-----NEW SLIDE-----");
        slideShowUpload.single('slideShow')
    } catch (e) {
        console.log(e)
        next(e)
    }
};


