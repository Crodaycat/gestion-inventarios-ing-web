import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { Enum_RoleName } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

export const authenticationInterceptor = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<boolean> => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: 'Unauthorized' });
    return false;
  }

  return true;
};

export const authorizationInterceptor = async (
  req: NextApiRequest,
  res: NextApiResponse,
  allowedRoles: Enum_RoleName[]
): Promise<boolean> => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: 'Unauthorized' });
    return false;
  }

  const role = session.user?.role;

  if (!role || !allowedRoles.includes(role)) {
    res.status(403).json({ message: 'Forbidden' });
    return false;
  }

  return true;
};
