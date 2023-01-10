import mongoose from "mongoose" ;
import JoiError from "../Exceptions/validationError";

const adminSchema = new mongoose.Schema({

    adminName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30

    },
    adminFamily: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 35


    },
    adminUsername: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
        uniqe: true

    },
    creationDate: {
        type: Date,
        default:Date.now
    },
    adminPassword: {
        type: String,
        minlength: 8
    },
    adminHashedPassword: {
        type: String
    }
})
adminSchema.post('save',(error,doc,next)=>{
    (error.name==='MongoError'&&error.code===11000)?next(new JoiError("Unique Item AdminsDB","Username is repetitive",44,404,{"pointer":"/admin/register","parameter":"req.data"})):next()
})
module.exports = mongoose.model("admins", adminSchema);
