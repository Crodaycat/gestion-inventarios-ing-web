import { Material as PrismaMaterial, Role, User } from '@prisma/client';

export interface Material extends PrismaMaterial {
  createdBy: {
    name: string | null;
  };
}

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
