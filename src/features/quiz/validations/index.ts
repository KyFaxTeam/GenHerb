import Joi from "joi"

export const getQuestionnaireScheme = Joi.object().keys({
            rubric : Joi.string().required()
        }); 
