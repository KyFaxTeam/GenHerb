import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "../../auth/entities";

@Entity()
export class StatsUser {
  @PrimaryGeneratedColumn()
      id!: number;

  @Column()
      userId!: number;

  @OneToOne(() => User)
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
      user!: User;

  @Column({default : 0})
      score!: number;

  @Column({default : 0})
      correctAnswers!: number;

  @Column({default : 0})
      incorrectAnswers!: number;

  @Column("json")
  scoresByQuiz!: {
    [quizId: number]: {
      date: Date;
      score: number;
    };
  };

  @Column()
      timeToPlay!: number;

  @CreateDateColumn({ type: "timestamp with time zone" })
      createdAt!: Date;

}
