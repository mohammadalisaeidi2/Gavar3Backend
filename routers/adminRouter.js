import express from 'express';
import {adminLogin, adminRegister} from '../controllers/adminController';
import {adminLoginValidation} from "../middlewares/validation";
import {adminLoginSanitization} from "../middlewares/sanitization";
import { createSlideShow } from '../controllers/adminController';
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
    //router.post('/admin/createslideshow',[],createSlideShow);
} catch (error) {
    console.log(error)
}

export default router;