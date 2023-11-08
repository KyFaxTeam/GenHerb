import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm'

@Entity('quiz')
export class Quiz extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  rubric: string;

  @Column()
  answer: string;

  @Column({ nullable: true })
  otherAnswer: string | null;
  
  constructor(id: number, question: string, rubric: string, answer: string, otherAnswer: string | null) {
    super();

    this.id = id;
    this.question = question;
    this.rubric = rubric;
    this.answer = answer;
    this.otherAnswer = otherAnswer;
  }
  
}