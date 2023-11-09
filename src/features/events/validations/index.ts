import Joi from "joi"

export const getActiveEventScheme = Joi.object().keys({
    // TODO : We must define it 
}); 

export const getEventWithIdScheme = Joi.object().keys({
    id : Joi.string().required()
}); 

export const getStatisticScheme = Joi.object().keys({
    // TODO : We must define it 
}); 

export const getUserResponseScheme = Joi.object().keys({
    // TODO : We must define it 
}); 

export const postUserResponseScheme = Joi.object().keys({
    // TODO : We must define it 
}); 