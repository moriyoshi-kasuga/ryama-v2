import { authOptions } from '@/lib/authOptions';
import prisma from '@/lib/prismadb';
import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const option = req.nextUrl.searchParams.get('option');
    if (option === 'all') {
      const explorer = await prisma.directory.findFirst({
        where: {
          isExplorer: true,
        },
        include: {
          documents: true,
          children: true,
        },
      });
      return Response.json(explorer, { status: 201 });
    } else {
      const explorer = await prisma.directory.findFirst({
        where: {
          isExplorer: true,
        },
        select: {
          id: true,
        },
      });
      return Response.json(explorer, { status: 201 });
    }
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
};
