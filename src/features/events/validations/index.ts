import Joi from "joi";

export const getActiveEventScheme = {
    params : Joi.object().keys({
        status : Joi.string().valid("past", "active", "future").required().description("I take  0: for inactive Events and 1 for active Events")
    }) };

export const EventWithIdScheme = {
    query : Joi.object().keys({
        id : Joi.string().required().description("Id for events which want get data")
    })}; 

export const getStatisticScheme = {
    query : Joi.object().keys({
        id: Joi.string().required().description("Id of Event")
    })
};

export const getUserResponseScheme = Joi.object().keys({
    // TODO : We must define it 
}); 

export const postUserResponseScheme = {
    body : Joi.object().keys({
        eventId: Joi.string().required().description("Event played Id"),
        playerPseudo: Joi.string().required().description("player Pseudo"),
        score: Joi.number().required(),
        correctAnswers: Joi.number().required(),
        incorrectAnswers: Joi.number().required(),
        response: Joi.array().items(
            Joi.object().keys({
                thematic: Joi.string().required(),
                subThematic: Joi.string().required(),
                result : Joi.array().items(
                    Joi.object().keys({
                        questionNum : Joi.number().required().description("Number of question"),
                        // question : Joi.string().required(),
                        // correctAnswer : Joi.string().required(),
                        playerAnswer : Joi.string().required(),
                        isCorrect : Joi.boolean().required(),
                        // questionPoint : Joi.number().required(),
                    })
                )
            })
        ),
        timeToPlay: Joi.number().required(),
        scoreBeforeEvent: Joi.number().required(),
        scoreAfterEvent: Joi.number().required(),
    })
};

/**
 * All events quiz are list of object type
 */

// {
//     "rubric": "Cinéma",
//     "quiz": 
//     [
      
//       {
//         "id": 16,
//         "question": "Quel film a remporté l'Oscar du meilleur film en 2019 ? ",
//         "answer": "Green Book",
//         "otheranswers": null
//       },
      
//       {
//         "id": 13,
//         "question": "Qui a remporté l'Oscar du meilleur acteur pour son rôle dans le film 'The Revenant' en 2016 ? ",
//         "answer": "Leonardo DiCaprio.",
//         "otheranswers": null
//       },
      
//       {
//         "id": 19,
//         "question": "Quel réalisateur a remporté l'Oscar du meilleur réalisateur pour le film 'La La Land' en 2017 ? ",
//         "answer": "Damien Chazelle.",
//         "otheranswers": null
//       }]}



// const data = {
//   eventId: "event123",
//   playerPseudo: "john_doe",
//   score: 80,
//   correctAnswers: 15,
//   incorrectAnswers: 5,
//   response: [
//     {
//       rubric: "Math",
//       result: [
//         {
//           question: "What is 2 + 2?",
//           correctAnswer: "4",
//           playerAnswer: "4",
//           isCorrect: true,
//           questionPoint: 10,
//         },
//         {
//           question: "Solve for x: 3x - 5 = 10",
//           correctAnswer: "5",
//           playerAnswer: "5",
//           isCorrect: true,
//           questionPoint: 15,
//         },
//       ],
//     },
//     {
//       rubric: "Science",
//       result: [
//         {
//           question: "What is the chemical symbol for water?",
//           correctAnswer: "H2O",
//           playerAnswer: "H2O",
//           isCorrect: true,
//           questionPoint: 12,
//         },
//         {
//           question: "Who developed the theory of relativity?",
//           correctAnswer: "Einstein",
//           playerAnswer: "Einstein",
//           isCorrect: true,
//           questionPoint: 18,
//         },
//       ],
//     },
//     {
//       rubric: "History",
//       result: [
//         {
//           question: "In which year did World War I end?",
//           correctAnswer: "1918",
//           playerAnswer: "1918",
//           isCorrect: true,
//           questionPoint: 20,
//         },
//         {
//           question: "Who was the first President of the United States?",
//           correctAnswer: "Washington",
//           playerAnswer: "Washington",
//           isCorrect: true,
//           questionPoint: 25,
//         },
//       ],
//     },
//   ],
// };


// const data = {
//     eventId: "event456",
//     playerPseudo: "alice_smith",
//     score: 95,
//     correctAnswers: 18,
//     incorrectAnswers: 2,
//     response: [
//       {
//         rubric: "Geography",
//         result: [
//           {
//             question: "What is the capital of France?",
//             correctAnswer: "Paris",
//             playerAnswer: "Paris",
//             isCorrect: true,
//             questionPoint: 15,
//           },
//           {
//             question: "Which river is the longest in the world?",
//             correctAnswer: "Nile",
//             playerAnswer: "Nile",
//             isCorrect: true,
//             questionPoint: 20,
//           },
//           // Add more questions for the "Geography" rubric
//         ],
//       },
//       {
//         rubric: "Technology",
//         result: [
//           {
//             question: "Who is the CEO of Tesla?",
//             correctAnswer: "Elon Musk",
//             playerAnswer: "Elon Musk",
//             isCorrect: true,
//             questionPoint: 25,
//           },
//           {
//             question: "What does CPU stand for?",
//             correctAnswer: "Central Processing Unit",
//             playerAnswer: "Central Processing Unit",
//             isCorrect: true,
//             questionPoint: 15,
//           },
//           // Add more questions for the "Technology" rubric
//         ],
//       },
//       // Add more rubrics
//     ],
//   };