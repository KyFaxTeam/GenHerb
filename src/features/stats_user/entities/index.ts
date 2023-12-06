import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../auth/entities";

@Entity()
export class StatsUser {
  @PrimaryGeneratedColumn()
      id!: number;

  @Column()
      pseudo!: string;
  
  @OneToOne(() => User)
    @JoinColumn({ name: "pseudo", referencedColumnName: "pseudo" })
      user!: User;
}
