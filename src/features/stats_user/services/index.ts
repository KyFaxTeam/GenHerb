import httpStatus from "http-status";
import { BaseService } from "../../../abstracts/service.base";
import config from "../../../config";
import { dbSource } from "../../../config/data.source";
import ApiError from "../../../utils/apiError";
import {  StatsUser } from "../entities";


// export class StatsUserService extends BaseService<StatsUser> {

//     private repo = dbSource.getRepository(StatsUser);
//     public constructor() {
//         super("Stats User", StatsUser);
//     }

//     public async get(thematic:string): Promise<any> {
//     }

// }

export class StatsUserService extends BaseService<StatsUser> {

    private repo = dbSource.getRepository(StatsUser);
    public constructor() {
        super("Stats User", StatsUser); 
    }

    public async getStatsWithUserId(id: number): Promise<any> {
      
        const result = await this.repo.createQueryBuilder("statsUser")
            // .select(["statsUser.pseudo","statsUser.score", "statsUser.correctAnswers", "statsUser.incorrectAnswers", "statsUser.scoresByQuiz","statsUser.timeToPlay", "statsUser.createdAt"])
            .where("statsUser.userId = :id", {id : id})
            .getOne()
            
        if (!result ) {
            throw new ApiError({status : httpStatus.NOT_FOUND, message: `This id: ${id} not found`});
        }
        return result; 
        
    }

    public async postStatsUser(id: number, data: object): Promise<void> {
       try { 
        const isExist = await this.repo.createQueryBuilder("statsUser")
            .where("statsUser.userId = :id", {id : id})
            .getOne();

        // console.log(isExist)
        
        if (isExist) {
            if (isExist instanceof StatsUser) {
                this.addStats(isExist, data)
                return ;
            } else {
                throw new ApiError({status : httpStatus.NOT_FOUND, message: `This id: ${id} has already its stats`});
            } 
        }
        const entity = this.repo.create(data) ;
        entity.userId = id; 
        await this.repo.save(entity);
        // console.log("Log finish")
        return ;
        
    } catch(error) {
        throw new ApiError({status : httpStatus.INTERNAL_SERVER_ERROR, message: `Internal server error on poststats`});

    }
}

    public async addStats(isExist: StatsUser, data: object): Promise<any> {
      try {

        if('score' in data) {
            isExist.score += (data as { score: number }).score
        } 

        if ('incorrectAnswers' in data) {
            isExist.correctAnswers += (data as { incorrectAnswers: number}).incorrectAnswers
        }

        if ('scoresByQuiz' in data) {
            isExist.scoresByQuiz.push(...(data as { scoresByQuiz: any }).scoresByQuiz)
        }

        if ('timeToPlay' in data) {
            isExist.timeToPlay += (data as { timeToPlay: number}).timeToPlay
        }
        
        await this.repo.save(isExist);

      } catch (error) {
        throw new ApiError({status : httpStatus.INTERNAL_SERVER_ERROR, message: `AddStats Errors`});
      }
       
        
}

    public async updateStats(id: number, updates: object): Promise<any> {

        try {

            const result = await this.repo.createQueryBuilder("statsUser")
            // .select(["statsUser.pseudo","statsUser.score", "statsUser.correctAnswers", "statsUser.incorrectAnswers", "statsUser.scoresByQuiz","statsUser.timeToPlay", "statsUser.createdAt"])
            .where("statsUser.userId = :id", {id : id})
            .getOne()

            if (!updates) {
                throw new ApiError({status : httpStatus.NOT_FOUND, message: `The updates object are not sent`});
            }

            
            if (!result ) {
                throw new ApiError({status : httpStatus.NOT_FOUND, message: `This id: ${id} not found`});
            } 

            if ('scoresByQuiz' in updates) {

                const { scoresByQuiz, ...updatesWithoutScoresByQuiz } = updates;
                
                let quizId = 0
                if (typeof scoresByQuiz === 'object' && scoresByQuiz !== null && 'quizId' in scoresByQuiz) {
                    quizId  = scoresByQuiz.quizId as number
                } else {
                    throw new ApiError({status : httpStatus.NOT_FOUND, message: `quizId not sent in scoresByQuiz`});    
                }
                
                const quizIndex = result.scoresByQuiz.findIndex(quiz => quiz.quizId === quizId);
            
                if (quizIndex !== -1) {
                result.scoresByQuiz[quizIndex] = scoresByQuiz as any;
                Object.assign(result, updatesWithoutScoresByQuiz);
                }
            } else {
                Object.assign(result, updates);
            }
            

            return result; 
            

        } catch (error) {
            console.error(error)
            throw new ApiError({status : httpStatus.INTERNAL_SERVER_ERROR, message: `Update Errors`});
        }
      
        
    }

    public async deleteStatsUser(id: number): Promise<void> {
        try { 
         const isExist = await this.repo.createQueryBuilder("statsUser")
             .where("statsUser.userId = :id", {id : id})
             .getOne();
 
         // console.log(isExist)
         
         if (!isExist) {
            throw new ApiError({status : httpStatus.NOT_FOUND, message: `This id: ${id} not found `});
         }

         await this.repository.delete(isExist.id)
         return ;
         
     } catch(error) {
         throw new ApiError({status : httpStatus.INTERNAL_SERVER_ERROR, message: `Internal server error on poststats`});
 
     }
 }

 public async getOwnTotalQuizCompleted(id: number): Promise<object> {
    const stats = await this.repo.findOne({ where: { userId: id } });
    if (!stats) {
        throw new ApiError({status : httpStatus.NOT_FOUND, message: `This id: ${id} not found `});
    }
    return {"total": stats.scoresByQuiz.length, "scoresByQuiz": stats.scoresByQuiz };
 }

 //  public async getOwnRanking(id:number): Promise<number> {
//     const ranking = await this.repo.findOne({ where: { userId: id } });
//     if (!ranking) {
//         throw new ApiError({status : httpStatus.NOT_FOUND, message: `This id: ${id} not found `});
//     }
//     return ranking.score;
//  }
 
 

/////////////// Admin Functions

 public async getRanking(): Promise<StatsUser[]> {
    const ranking = await this.repo.find({ 
        order: { score: 'DESC'}, 
        select:  ['userId', 'score']
    });
    return ranking;
 }

 
 public async getQuizStats(quizId: number): Promise<any> {
    
    const users = await this.repo.find({
      where: {
        scoresByQuiz: {
            quizId: quizId,
        },
      },
    });

    const totalParticipants = users.length;

    // Calcul du pourcentage de bonnes réponses
    const totalScore = users.reduce((sum, user) => sum + user.score, 0);
    const meanScore = totalScore / totalParticipants; // Supposons que chaque quiz a 10 questions

    return {
      totalParticipants: totalParticipants,
      meanScore: meanScore,
    };
  }
   


} 
