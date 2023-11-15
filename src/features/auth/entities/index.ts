// src/models/User.ts

import { Entity, 
    PrimaryGeneratedColumn, 
    Column, BaseEntity, 
    CreateDateColumn, 
    UpdateDateColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pseudo: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column({ default: false })
  email_verified: boolean;

  @Column({ default: false })
  is_active: boolean;
  
  @Column({ type: 'string', nullable: true, unique: true })
  token: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(id:number, pseudo:string, email:string, password:string, avatar:string, email_verified:boolean, is_active:boolean, token:string|null, createdAt:Date, updatedAt:Date) {
    super()
    this.id = id
    this.pseudo = pseudo
    this.email = email,
    this.password = password, 
    this.avatar = avatar
    this.email_verified = email_verified
    this.is_active = is_active
    this.token = token
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
