import BaseController from "../../../abstracts/controller.base";
import { successResponseFormat } from "../../../utils/success.response.send";
import { RequestwithUser } from "../../auth/interfaces";
import { StatsUserService } from "../services";
import { Request, Response } from "express";
import ApiError from "../../../utils/apiError";

// export default class StatsUserController extends BaseController {
//     public constructor() {
//         super(new StatsUserService());
//     }


//     // Function to retrieve a limit quiz questions of thmatic from the database  
//     // TODO:  I need to use the previously written pick function work
//     public get = this.catchAsync(async (req: Request, res: Response) => {
    
//     });

// }


export default class StatsUserController extends BaseController {
    public constructor() {
        super(new StatsUserService());
    }

    public getStatsWithUserId = this.catchAsync(async (req: Request, res: Response) => {
        const id = parseInt(req.params.userId);
        const result = await this.service.getStatsWithUserId(id);

        // Send the result as the response. getOwnStats

        if (result) {
            res.status(200).send(successResponseFormat(result));

          } else {
            res.send(new ApiError({ status: 404, message: 'Stat not found.' }));
          }
    });

    public getOwnStats = this.catchAsync(async (req: RequestwithUser, res: Response) => {
      // console.log("this.service : ", this.service)

        const result = await this.service.getStatsWithUserId(req.user.id);

        // Send the result as the response. getOwnStats

        if (result) {
            res.status(200).send(successResponseFormat(result));

          } else {
            res.send(new ApiError({ status: 404, message: 'Stat not found.' }));
          }
    });

    public postStatsUser  =  this.catchAsync(async (req: RequestwithUser, res: Response) => {
        const data = req.body;
        await this.service.postStatsUser(req.user.id, data) ;
        
        res.status(201).send(successResponseFormat({ message: 'Stats posts successfully.' }));


    });

    public updateStats = this.catchAsync( async (req: RequestwithUser, res: Response): Promise<void> => {
      // console.log("I'm here ***********")
      //   // const userId: number = parseInt(req.params.userId, 10);
      //   console.log("this.service : ", this.service)
        const updates = req.body;
        
        const updatedStats = await this.service.updateStatsService(req.user.id, updates);

        if (updatedStats) {
            res.status(200).send(successResponseFormat(updatedStats));

        } else {
            res.send(new ApiError({ status: 404, message: 'Unable to update Stats.' }));
        }

      });

    public deleteStatsUser = this.catchAsync(async (req: Request, res: Response): Promise<void> => {

        const userId: number = parseInt(req.params.userId, 10);
        await this.service.deleteStatsUser(userId);
        res.status(204).send(successResponseFormat({ message: 'Stats delete successfully.' }));

    });

    public getOwnTotalQuizCompleted = this.catchAsync(async (req: RequestwithUser, res: Response): Promise<void> => {

      console.log('getOwnTotalQuizCompleted Controller')

      const totalQuizStats = await this.service.getOwnTotalQuizCompleted(req.user.id);

      if (totalQuizStats) {
          res.status(200).send(successResponseFormat(totalQuizStats));

      } else {
          res.send(new ApiError({ status: 404, message: 'TotalQuiz not found.' }));
      }

    });

    // admin 
    public getRanking = this.catchAsync(async (req: Request, res: Response): Promise<any> => {
    const ranking = await this.service.getRanking();
    if (ranking) {
        res.status(200).send(successResponseFormat(ranking));

      } else {
        res.send(new ApiError({ status: 404, message: 'Unable to get Ranking' }));
      }
    res.send(successResponseFormat(ranking));

    });

    public getQuizStats = this.catchAsync( async (req: Request, res: Response): Promise<any> => {
      const quizId: number = parseInt(req.params.quizId, 10);
      const quizStats = await this.service.getQuizStats(quizId);
      if (quizStats) {
          res.status(200).send(successResponseFormat(quizStats));

        } else {
          res.send(new ApiError({ status: 404, message: 'quizStats not found.' }));
        }
    }); 
}

