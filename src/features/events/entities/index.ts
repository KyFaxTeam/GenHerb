import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity("events")
export class Event {
  @PrimaryGeneratedColumn()
      id: number;

  @Column()
      name: string;

  @Column({ nullable: true })
      image: string;

  @Column("json", {array : true})
      content: object[]; // Assuming a custom type for 'List<Map>>'

  @Column()
      details: string;

  @Column({ nullable: true })
      description: string ;

  @Column({ type: "timestamp" })
      createdAt: Date;

  @Column({ type: "timestamp" })
      expireAt: Date;

  constructor(
      id : number,
      name: string,
      content: object[],
      details: string,
      createdAt: Date ,
      expireAt: Date ,
      image: string,
      description: string,

     
  ) {
      this.id = id;
      this.name = name;
      this.content = content;
      this.details = details;
      this.createdAt = createdAt;
      this.expireAt = expireAt ;
      this.image = image; 
      this.description = description ;
  }
}
