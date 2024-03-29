import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user';
import dotenv from 'dotenv';
dotenv.config();


export const userLogin = (req, res, next) => {
    try {
        console.log("-----USER Login-----");
        User.findOne({ userEmail: req.body.userEmail }, ((error, user) => {
            error ? console.log(error) : user ? bcrypt.compare(req.body.userPassword, user.userHashedPassword, (error, result) => {
                error ? console.log(error) : result ? jwt.sign({ _id: user._id,isAdmin:false }, process.env.HASHED, { expiresIn: '20m' }, (error, token) => {
                    error ? console.log(error) : token ? res.header("auth-token", token).send(token) : console.log(token)
                }) : res.status(401).send("your Email or password isn't correct")
            }) : res.status(401).send("you are not authorized!")
        }))
    } catch (e) {
        console.log(e)
    }
};




export const userRegister = async (req, res, next) => {
    try {
        console.log("-----User Register-----");
        const {
            userName,
            userFamily,
            userEmail,
            userPassword
        } = req.body;
        const HashedPassword = await bcrypt.hash(userPassword, await bcrypt.genSalt(10));
        User.create({
            userName,
            userFamily,
            userEmail,
            userPassword,
            userHashedPassword: HashedPassword
        }, (error) => {
            error ? next(error) : res.status(200).send({ "message": "submitted!" })
        })
    } catch (e) {
        next(e)
    }
};



//GET one USER
export const getuser = async (req, res, next) => {
    try {
        console.log("-----GET ONE USER INFO -----");
        console.log(req.params.id)
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};




//GET ALL USERS
export const getAllUsers = async (req, res, next) => {
    try {
        console.log("-----GET ALL USERS -----");
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
};