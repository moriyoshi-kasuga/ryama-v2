import { directoriesUpdate } from '@/features/api/directory';
import { authOptions } from '@/lib/authOptions';
import prisma from '@/lib/prismadb';
import { getServerSession } from 'next-auth';

export const PATCH = async (req: Request, params: IdParams) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { isPublic } = await req.json();
    const document = await prisma.document.update({
      where: {
        id: params.id,
      },
      data: {
        isPublic,
        updatedAt: new Date(),
      },
    });
    directoriesUpdate(document.parentId);
    return Response.json(document, { status: 201 });
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
};
