// types/user.ts
export enum UserRole {
  ADMIN = 'admin',
  LAWYER = 'lawyer',
  PARALEGAL = 'paralegal',
  INTERN = 'intern'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}