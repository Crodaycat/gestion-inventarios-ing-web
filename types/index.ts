import { User } from '@prisma/client';

export interface UsersQuery {
  users: User[];
  totalCount: number;
}
