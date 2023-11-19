import prisma from '@/service/prisma';
import { authorizationInterceptor } from '@/utils/api.interceptors';
import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

interface ResponseData {
  user?: User;
  message?: string;
}

const updateUserApi = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  await authorizationInterceptor(req, res, ['ADMIN']);

  if (req.method === 'PUT') {
    const id  = req.query.id as string;
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
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

export default updateUserApi;
