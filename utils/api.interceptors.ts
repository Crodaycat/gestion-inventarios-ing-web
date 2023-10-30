import { AuthOptions } from '@/pages/api/auth/[...nextauth]';
import { Enum_RoleName } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

export const authenticationInterceptor = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getServerSession(req, res, AuthOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export const authorizationInterceptor = async (
  req: NextApiRequest,
  res: NextApiResponse,
  allowedRoles: Enum_RoleName[]
) => {
  const session = await getServerSession(req, res, AuthOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (!allowedRoles.includes(session.user?.role)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  return session.user.role.name;
};
