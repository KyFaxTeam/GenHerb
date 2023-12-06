import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity("events")
export class Event {
  @PrimaryGeneratedColumn()
      id!: number;

  @Column()
      name!: string;

  @Column({ nullable: true })
      image!: string;

    @Column()
        numberOfQuestions!: number;

  @Column("json", { array: true })
      content!: object[]; // Assuming a custom type for 'List<Map>>'

  @Column()
      details!: string;

  @Column({ nullable: true })
      description!: string;

  @Column({ type: "timestamp" })
      createdAt!: Date;

  @Column({ type: "timestamp" })
      expireAt!: Date;
}
