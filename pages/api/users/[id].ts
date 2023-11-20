import prisma from '@/service/prisma';
import { authorizationInterceptor } from '@/utils/api.interceptors';
import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

interface ResponseData {
  user?: User | null;
  message?: string;
}

const getUserApi = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  try {
    const id = req.query.id as string;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: 'Error getting user' });
  }
};

const updateUserApi = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const id = req.query.id as string;
  const { role } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        roleId: role,
      },
    });

    return res.status(200).json({ user: updatedUser });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating user' });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    await authorizationInterceptor(req, res, ['ADMIN']);

    if (req.method === 'GET') {
      return getUserApi(req, res);
    } else if (req.method === 'PUT') {
      return updateUserApi(req, res);
    }
    return res.status(405).json({ message: 'Method not allowed' });
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
}
