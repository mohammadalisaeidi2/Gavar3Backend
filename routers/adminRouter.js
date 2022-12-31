import express from 'express';
import {adminLogin, adminRegister} from '../controllers/adminController';
import {adminLoginValidation} from "../middlewares/validation";
import {adminLoginSanitization} from "../middlewares/sanitization";
import authorization from "../middlewares/authorization";
import JoiError from "../Exceptions/validationError";
import {GridFsStorage} from "multer-gridfs-storage";
import crypto from "crypto";
import path from "path";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

const router = new express.Router();
try {
    router.post('/admin/login', [adminLoginSanitization, adminLoginValidation], adminLogin);
    router.post('/admin/register', [], adminRegister);


//create storage engine
    const storage = new GridFsStorage({
        url: process.env.DB_URL,
        options: {useUnifiedTopology: true},
        file: (req, file) => {
            return new Promise((resolve, reject) => {
                crypto.randomBytes(16, (err, buf) => {
                    if (err) {
                        return reject(err);
                    }
                    const filename = buf.toString('hex') + path.extname(file.originalname);
                    const fileInfo = {
                        filename: filename,
                        bucketName: 'uploads'
                    };
                    resolve(fileInfo);
                });
            });
        }
    });


} catch (error) {
    console.log(error)
}

export default router;