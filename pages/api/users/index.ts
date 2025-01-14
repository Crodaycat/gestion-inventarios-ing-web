import prisma from '@/service/prisma';
import { authorizationInterceptor } from '@/utils/api.interceptors';
import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  users?: User[];
  totalCount?: number;
  message?: string;
};

const queryUsersHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const { page, itemPerPage } = req.query;

  const {
    _count: { email: totalCount },
  } = await prisma.user.aggregate({
    _count: { email: true },
  });

  if (totalCount === 0) {
    return res.status(200).json({ users: [], totalCount });
  }

  const users = await prisma.user.findMany({
    orderBy: {
      email: 'asc',
    },
    skip: (Number(page || 1) - 1) * Number(itemPerPage || 20),
    take: Number(itemPerPage || 20),
  });

  res.status(200).json({ users, totalCount });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    if (!(await authorizationInterceptor(req, res, ['ADMIN']))) {
      return;
    }

    if (req.method === 'GET') {
      return queryUsersHandler(req, res);
    }
    return res.status(405).json({ message: 'Method not allowed' });
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
}
