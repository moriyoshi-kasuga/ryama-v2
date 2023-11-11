import { directoriesUpdate } from '@/features/api/directory';
import { ensureAuthenticated } from '@/features/api/utils';
import prisma from '@/lib/prismadb';

export const PATCH = async (req: Request, params: IdParams) => {
  return ensureAuthenticated(async (session) => {
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
  });
};
