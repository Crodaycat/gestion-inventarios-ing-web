import { Material, Role, User } from '@prisma/client';

export interface UsersQuery {
  users: User[];
  totalCount: number;
}

export interface RolesQuery {
  roles?: Role[];
  message?: string;
}

export interface MaterialsQuery {
  materials: Material[];
  totalCount: number;
}

export interface MovementsQuery {
  movements: Movement[];
  totalCount: number;
}
