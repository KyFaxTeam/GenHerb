import Joi from "joi";
export const getStatsWithIdScheme = {
    query: Joi.object().keys({
        id: Joi.string().required().description("Id of Event")
    })
};
export const playerGetOwnStats = {
    query: Joi.object().keys({
        pseudo: Joi.string().required().description("Player Pseudo")
    })
};
export const playerPostStatsEventScheme = {
    body: Joi.object().keys({
        eventId: Joi.string().required().description("Event played Id"),
        pseudo: Joi.string().required().description("player Pseudo"),
        score: Joi.number().required(),
        correctAnswers: Joi.number().required(),
        incorrectAnswers: Joi.number().required(),
        response: Joi.array().items(Joi.object().keys({
            // Rubric info
            name: Joi.string().required(),
            result: Joi.array().items(Joi.object().keys({
                questionId: Joi.number().required().description("Number of question"),
                playerAnswer: Joi.string().required(),
                isCorrect: Joi.boolean().required(),
            }))
        })),
        timeToPlay: Joi.number().required(),
        scoreBeforeEvent: Joi.number().required(),
        scoreAfterEvent: Joi.number().required(),
    })
};
