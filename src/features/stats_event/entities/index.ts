import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "../../auth/entities";
import { Event } from "../../events/entities";

@Entity()
export class StatsEvent {
  @PrimaryGeneratedColumn()
      id!: number;

  @Column()
      eventId!: string;

  @OneToOne(() => Event)
    @JoinColumn({ name: "eventId", referencedColumnName: "id" })
      event!: Event;

  @Column()
      pseudo!: string;

  @OneToOne(() => User)
    @JoinColumn({ name: "pseudo", referencedColumnName: "pseudo" })
      user!: User;

  @Column({default : 0})
      score!: number;

  @Column({default : 0})
      correctAnswers!: number;

  @Column({default : 0})
      incorrectAnswers!: number;

  @Column("json", { array: true })
      response!: object[];

  @Column()
      timeToPlay!: number;

  @Column()
      scoreBeforeEvent!: number;

  @Column()
      scoreAfterEvent!: number;

  @CreateDateColumn({ type: "timestamp with time zone" })
      createdAt!: Date;

}
