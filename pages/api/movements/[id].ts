import prisma from '@/service/prisma';
import { Movement } from '@/types';
import { authorizationInterceptor } from '@/utils/api.interceptors';
import { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  movements?: Movement[];
  totalCount?: number;
  message?: string;
};

const queryMovementsHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  await authorizationInterceptor(req, res, ['ADMIN', 'USER']);

  const { page, itemPerPage, id } = req.query;

  const {
    _count: { id: totalCount },
  } = await prisma.inventoryMovement.aggregate({
    _count: { id: true },
    where: {materialId: id?.toString()}
  });

  if (totalCount === 0) {
    return res.status(200).json({ movements: [], totalCount });
  }

  const movements = await prisma.inventoryMovement.findMany({
    include: {
      createdBy: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    where: {materialId: id?.toString()},
    skip: (Number(page || 1) - 1) * Number(itemPerPage || 20),
    take: Number(itemPerPage || 20),
  });

  res.status(200).json({ movements, totalCount });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    if (req.method === 'GET') {
      return queryMovementsHandler(req, res);
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}
