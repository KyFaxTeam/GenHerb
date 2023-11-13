import Joi from "joi";

export const getQuestionnaireScheme = {
    query: Joi.object().keys({
        rubric: Joi.string().required(),
    }),
};
