import Joi from "joi";
export const scheme = {
    query: Joi.object().keys({
        id: Joi.string().required()
    }),
};
