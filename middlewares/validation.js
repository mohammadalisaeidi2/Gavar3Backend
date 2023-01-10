import Joi from 'joi';
import JoiError from "../Exceptions/validationError";

export const adminLoginValidation = (data, res, next) => {
    try {
        console.log("-----adminLoginValidation-----")
        const schema = Joi.object({
            adminUsername: Joi.string().required().min(3),
            adminPassword: Joi.string().required().min(8)
        });
        const result = schema.validate(data.body);
        result.error ? next(new JoiError("ValueError", result.error.details[0].message, 44, 401, 1,
            {
                pointer: data.path,
                parameter: result.error.details[0].context.key,
            },
            {type: result.error.details[0].type, authors: ["kh444"]}
        )) : next();
    } catch (e) {
        next(e)
    }
}

export const userRegisterValidation = (data, res, next) => {
    try {
        console.log("-----user REGISTER Validation-----")
        const schema = Joi.object({
            userName: Joi.string().required().min(3),
            userFamily: Joi.string().required().min(3),
            userEmail: Joi.string().required().min(6).email(),
            userPassword: Joi.string().required().min(8)
        });
        const result = schema.validate(data.body);
        result.error ? next(new JoiError("ValueError", result.error.details[0].message, 44, 401, 1,
            {
                pointer: data.path,
                parameter: result.error.details[0].context.key,
            },
            {type: result.error.details[0].type, authors: ["albert"]}
        )) : next();
    } catch (e) {
        next(e)
    }
}

export const userLoginValidation = (data, res, next) => {
    try {
        console.log("-----USER LOGIN Validation-----")
        const schema = Joi.object({
            userEmail: Joi.string().required().min(6).email(),
            userPassword: Joi.string().required().min(8)
        });
        const result = schema.validate(data.body);
        result.error ? next(new JoiError("ValueError", result.error.details[0].message, 44, 401, 1,
            {
                pointer: data.path,
                parameter: result.error.details[0].context.key,
            },
            {type: result.error.details[0].type, authors: ["albert"]}
        )) : next();
    } catch (e) {
        next(e)
    }
}