export interface UserInterface {
    pseudo: string;
    email: string;
    password: string;
    isActive?: boolean;
    email_verified?: boolean;
    avatar?: string;
    token?: string;
    created_at?: Date;
    updated_at?: Date;
  }