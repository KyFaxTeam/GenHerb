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

  @Column({type: 'varchar', nullable: true })
  otheranswers: string[] | null;
  
  constructor(id: number, question: string, rubric: string, answer: string, otheranswers: string[] | null) {
    super();

    this.id = id;
    this.question = question;
    this.rubric = rubric;
    this.answer = answer;
    this.otheranswers = otheranswers;
  }
  
}