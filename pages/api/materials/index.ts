import prisma from '@/service/prisma';
import { Material } from '@/types';
import { authorizationInterceptor } from '@/utils/api.interceptors';
import { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  materials?: Material[];
  totalCount?: number;
  message?: string;
};

const queryMaterialsHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  await authorizationInterceptor(req, res, ['ADMIN', 'USER']);

  const { page, itemPerPage } = req.query;

  const {
    _count: { name: totalCount },
  } = await prisma.material.aggregate({
    _count: { name: true },
  });

  if (totalCount === 0) {
    return res.status(200).json({ materials: [], totalCount });
  }

  const materials = await prisma.material.findMany({
    include: {
      createdBy: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
    skip: (Number(page || 1) - 1) * Number(itemPerPage || 20),
    take: Number(itemPerPage || 20),
  });

  res.status(200).json({ materials, totalCount });
};

const createMaterialHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  try {
    await authorizationInterceptor(req, res, ['ADMIN']);
    const { name, quantity, userId, createdAt, updatedAt } = req.body;

    const material = await prisma.material.create({
      data: {
        name,
        quantity,
        userId,
        createdAt,
        updatedAt,
      },
      include: {
        createdBy: {
          select: {
            name: true,
          },
        },
      },
    });

    res.status(201).json({
      message: 'Material created successfully',
      materials: [material],
    });
  } catch (error) {
    const errorMessage = error as Error;
    return res.status(400).json({ message: errorMessage.message });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    if (req.method === 'GET') {
      return queryMaterialsHandler(req, res);
    }

    if (req.method === 'POST') {
      return createMaterialHandler(req, res);
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}
