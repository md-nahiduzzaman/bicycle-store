import { USER_ROLE } from './user.constants';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'customer';
  isBlocked: boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
