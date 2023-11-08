import { Column, BaseEntity, PrimaryGeneratedColumn, Entity, CreateDateColumn, ManyToMany, JoinTable } from "typeorm"; 
import { Quiz } from "../../quiz/entities";

@Entity('events')
export class Event extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    name: string; 

    @Column()
    image: string; 

    @Column()
    details: string; 

    @CreateDateColumn()
    createdAt: Date; 

    @Column({ type: 'timestamp' })
    expireAt: Date; 


    @ManyToMany(() => Quiz)
    @JoinTable()
    quiz: Quiz[]; 

    constructor(id: number, name: string, image: string, details:string, createdAt:Date, updateAt:Date, expireAt: Date,  quiz:Quiz[]) {
        super();
        
        this.id = id, 
        this.name = name,
        this.image = image, 
        this.details = details,
        this.createdAt = createdAt, 
        this.quiz = quiz
        this.expireAt = expireAt
    }
}