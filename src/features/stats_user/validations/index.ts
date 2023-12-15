import Joi from "joi";

export const getStatsWithIdScheme = {
    params : Joi.object().keys({
        userId: Joi.string().required().description("Id of User")
    })
};

// export const playerGetOwnStats = {
//     query : Joi.object().keys({
//         pseudo: Joi.string().required().description("Player Pseudo")
//     })
// };


export const playerPostStatsEventScheme = {
    body : Joi.object().keys({
        // userId: Joi.string().required().description("User played Id"),
        score: Joi.number().default(0), // not required because the default value is defined in the entity
        correctAnswers: Joi.number().required(),
        incorrectAnswers: Joi.number().required(),
        scoresByQuiz: Joi.object({
            date: Joi.date().iso().default(() => new Date()),
            quizId: Joi.number().integer().required(),
            score: Joi.number().integer().required(),
          }).required(),
        timeToPlay: Joi.number().required(),
    })
};