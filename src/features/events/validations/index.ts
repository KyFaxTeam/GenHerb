import Joi from "joi";

export const getActiveEventScheme = {
    params : Joi.object().keys({
        isActive : Joi.number().valid(0,1).required().description("I take  0: for inactive Events and 1 for active Events")
    }) };

export const getEventWithIdScheme = {
    params : Joi.object().keys({
        id : Joi.string().required().description("Id for events which want get data")
    })}; 

export const getStatisticScheme = Joi.object().keys({
    // TODO : We must define it 
}); 

export const getUserResponseScheme = Joi.object().keys({
    // TODO : We must define it 
}); 

export const postUserResponseScheme = Joi.object().keys({
    // TODO : We must define it 
}); 