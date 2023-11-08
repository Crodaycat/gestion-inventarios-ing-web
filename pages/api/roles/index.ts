import prisma from '@/service/prisma';
import { authenticationInterceptor } from '@/utils/api.interceptors';
import { Role } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  roles?: Role[];
  message?: string;
};

const queryRolesHandler = async (
  _: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const roles = await prisma.role.findMany({
    orderBy: { name: 'asc' },
  });

  res.status(200).json({ roles });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    await authenticationInterceptor(req, res);

    if (req.method === 'GET') {
      return queryRolesHandler(req, res);
    }
    return res.status(405).json({ message: 'Method not allowed' });
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
}
