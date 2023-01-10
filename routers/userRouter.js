import express from 'express';
import { userRegister, userLogin } from '../controllers/userController';
import {adminLogin, adminRegister} from '../controllers/adminController';
import {adminLoginValidation ,userLoginValidation} from "../middlewares/validation";
import {adminLoginSanitization ,userRegisterSanitization} from "../middlewares/sanitization";
import { userRegisterValidation } from '../middlewares/validation';
import dotenv from "dotenv";
dotenv.config();

const router = new express.Router();
try {
    router.post('/user/login', [userLoginValidation], userLogin);
    router.post('/user/register', [userRegisterSanitization, userRegisterValidation], userRegister);
} catch (error) {
    console.log(error)
}

export default router;