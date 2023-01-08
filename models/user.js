import mongoose from "mongoose" ;
import JoiError from "../Exceptions/validationError";

const userSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    userFamily: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 35
    },
    userEmail: {
        required: true,
        type: String,
        minlength: 5,
        maxlength: 50,
        uniqe: true
    },
    userPhone: {
        type: String,
        minlength: 11,
        maxlength: 11,
        uniqe: true
    },
    userPassword: {
        type: String,
        minlength: 8
    },
    userHashedPassword: {
        type: String
    }
})
userSchema.post('save',(error,doc,next)=>{
    (error.name==='MongoError'&&error.code===11000)?next(new JoiError("Unique Item AdminsDB","Email is repetitive",44,404,{"pointer":"/user/register","parameter":"req.data"})):next()
})
module.exports = mongoose.model("users", userSchema);
