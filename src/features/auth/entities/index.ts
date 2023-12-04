// src/models/User.ts

import { Entity, 
  PrimaryGeneratedColumn, 
  Column, BaseEntity, 
  CreateDateColumn, 
  UpdateDateColumn } from 'typeorm';

type AllowedRoles = 'user' | 'admin' | 'moderator' | 'editor' | 'guest';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

@Column()
pseudo!: string;

@Column()
email!: string;

@Column()
password!: string;

@Column()
avatar?: string;

@Column({ default: false })
email_verified?: boolean;

@Column({ default: false })
is_active?: boolean;

@Column({ nullable: true, unique: true })
token?: string;

@Column({ nullable: true, unique: true })
accessToken?: string;

@Column({
  type: 'enum',
  enum: ['user', 'admin', 'moderator', 'editor', 'guest'],
  default: 'user',
})
roles!: AllowedRoles;

@CreateDateColumn()
createdAt?: Date;

@UpdateDateColumn()
updatedAt?: Date;
}
