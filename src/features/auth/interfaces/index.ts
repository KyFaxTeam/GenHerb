import { Request as ExpressRequest } from "express";
import { User } from "../entities";

type AllowedRoles = 'user' | 'admin' | 'moderator' | 'editor' | 'guest';
export interface UserInterface {
    pseudo: string;
    email: string;
    password: string;
    roles?: AllowedRoles;
    avatar?: string;
    isActive?: boolean;
    email_verified?: boolean;
    token?: string;
    created_at?: Date;
    updated_at?: Date;
    
  }

  export interface RequestwithUser extends ExpressRequest {
    user: User
  }