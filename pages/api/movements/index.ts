import prisma from '@/service/prisma';
import { Movement } from '@/types';
import { authorizationInterceptor } from '@/utils/api.interceptors';
import { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
    movements?: Movement[];
    totalCount?: number;
    message?: string;
};

const createMovementHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) => {
    try {
        const { movementType, quantity, materialId, userId, createdAt } = req.body;

        const movement = await prisma.inventoryMovement.create({
            data: {
                movementType,
                quantity,
                materialId,
                userId,
                createdAt,
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
            movements: [movement],
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
        await authorizationInterceptor(req, res, ['ADMIN', 'USER']);
        if (req.method === 'POST') {
            return createMovementHandler(req, res);
        }

        return res.status(405).json({ message: 'Method not allowed' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
