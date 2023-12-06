import { Request as ExpressRequest } from "express";
import { User } from "../entities";

type AllowedRoles = "user" | "admin" | "moderator" | "editor" | "guest";
export interface UserInterface {
    pseudo: string;
    email: string;
    password: string;
    country: string;
    age: number;
    roles?: AllowedRoles;
    avatar?: string;
    isActive?: boolean;
    email_verified?: boolean;
    token?: string | null;
    accessToken?: string | null;
    created_at?: Date;
    updated_at?: Date;
    
  }

  export interface RequestwithUser extends ExpressRequest {
    user: User,
    token: string
  }

  export interface SafeUserInterface {
    pseudo: string;
    email: string;
    country: string;
    age: number;
    roles?: AllowedRoles;
    avatar?: string;
    isActive?: boolean;
    email_verified?: boolean;
    created_at?: Date;
    updated_at?: Date;
    
  }
  export const createSafeUser = (user: User): SafeUserInterface => {
    const { password, token, accessToken, ...safeUser } = user;
    return safeUser;
  }