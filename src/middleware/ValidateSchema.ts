import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Response, Request } from 'express';
import Logging from '../library/Logging';
import { IAuthor } from '../models/Author';
import { IBook } from '../models/Book';
import { IUser } from '../models/User';

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            Logging.error(error);
            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    author: {
        create: Joi.object<IAuthor>({
            name: Joi.string().required()
        }),
        update: Joi.object<IAuthor>({
            name: Joi.string().required()
        })
    },
    book: {
        create: Joi.object<IBook>({
            author: Joi.string()
                .regex(/^[0-9a-fA-F]{24}/)
                .required(),
            title: Joi.string().required(),
            category: Joi.string().required(),
            pages: Joi.number().required()
        }),
        update: Joi.object<IBook>({
            author: Joi.string()
                .regex(/^[0-9a-fA-F]{24}/)
                .required(),
            title: Joi.string().required(),
            category: Joi.string().required(),
            pages: Joi.number().required()
        })
    },
    user: {
        create: Joi.object<IUser>({
            username: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required()
        }),
        update: Joi.object<IUser>({
            username: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required()
        })
    }
};
