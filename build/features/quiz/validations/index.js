import Joi from "joi";
export const getQuestionnaireScheme = {
    query: Joi.object().keys({
        thematic: Joi.string().required(),
        level: Joi.string().default("Normal")
    }),
};
