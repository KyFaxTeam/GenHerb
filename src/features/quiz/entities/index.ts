import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("quiz")
export class Quiz {
  @PrimaryGeneratedColumn()
      id: number;

  @Column()
      question: string;

  @Column("simple-array", {array : true})
      answer: string[];

  @Column()
      thematic: string;

  @Column({ nullable: true })
      subThematic: string;

  @Column()
      level: string;

  @Column()
      points: number;

  @Column()
      times: number;

  constructor(
      id: number,
      question: string,
      answer: string[],
      thematic: string,
      subThematic: string,
      level: string,
      points: number,
      times: number
  ) {
      this.id = id ;
      this.question = question;
      this.answer = answer;
      this.thematic = thematic;
      this.subThematic = subThematic;
      this.level = level;
      this.points = points;
      this.times = times;
  }
}
