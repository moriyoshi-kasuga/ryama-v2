import { ensureAuthenticated } from '@/features/api/utils';
import prisma from '@/lib/prismadb';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  return ensureAuthenticated(async (session) => {
    const option = req.nextUrl.searchParams.get('option');
    if (option === 'all') {
      const explorer = await prisma.directory.findFirst({
        where: {
          userId: session.id,
          isExplorer: true,
        },
        include: {
          documents: true,
          children: true,
        },
      });
      return Response.json(explorer, { status: 201 });
    } else {
      const id = await prisma.directory.findFirst({
        where: {
          userId: session.id,
          isExplorer: true,
        },
        select: {
          id: true,
        },
      });
      return Response.json(id, { status: 201 });
    }
  });
};
