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
    const { parentId } = await req.json();
    const directory = await prisma.directory.update({
      where: {
        id: params.id,
      },
      data: {
        parentId,
      },
    });
    directoriesUpdate(directory.id);
    return Response.json(directory, { status: 201 });
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
};
