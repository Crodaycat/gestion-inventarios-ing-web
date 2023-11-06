import { User, Material } from '@prisma/client';

export interface UsersQuery {
  users: User[];
  totalCount: number;
}

export interface MaterialsQuery {
  materials: Material[];
  totalCount: number;
}
