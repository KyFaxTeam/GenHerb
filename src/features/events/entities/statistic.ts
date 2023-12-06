// import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

// @Entity({ name: "statisticsForEvents" })
// export class StatisticsForEvents {
//   @PrimaryGeneratedColumn()
//       id: number;

//   @Column()
//       eventId: string;

//   @Column()
//       playerPseudo: string;

//   @Column()
//       score: number;

//   @Column()
//       correctAnswers: number;

//   @Column()
//       incorrectAnswers: number;

//   @Column("json", {array: true})
//       response: object[];

//   @Column()
//       timeToPlay: number;

//   @Column()
//       scoreBeforeEvent: number;

//   @Column()
//       scoreAfterEvent: number;

//   @CreateDateColumn({ type: "timestamp with time zone" })
//       createdAt: Date;

    
//   constructor(id: number,  createdAt: Date,
//       eventId: string,
//       playerPseudo: string,
//       score: number,
//       correctAnswers: number,
//       incorrectAnswers: number,
//       response: object[],
//       timeToPlay: number,
//       scoreBeforeEvent: number,
//       scoreAfterEvent: number,
//   ) {
//       this.id = id ;
//       this.eventId = eventId ;
//       this.playerPseudo = playerPseudo;
//       this.score = score ;
//       this.correctAnswers = correctAnswers ;
//       this.incorrectAnswers = incorrectAnswers;
//       this.response = response;
//       this.timeToPlay = timeToPlay;
//       this.scoreBeforeEvent = scoreBeforeEvent ;
//       this.scoreAfterEvent = scoreAfterEvent;
//       this.createdAt = createdAt;
//   }
// }
