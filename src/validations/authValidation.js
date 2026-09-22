import { Joi, Segments } from "celebrate";


export const registerSchema = {
    [Segments.BODY]: Joi.object({
        userName: Joi.string().max(40).allow(""),
        email: Joi.string().email().required().max(100),
        password: Joi.string().min(6).required(),
    })
};

export const loginSchema ={
        [Segments.BODY]: Joi.object({
        email: Joi.string().email().required().max(100),
        password: Joi.string().required(),
    })
    };