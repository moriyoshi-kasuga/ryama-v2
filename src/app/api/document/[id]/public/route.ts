import { directoriesUpdate } from '@/features/api/directory';
import { ensureAuthenticated } from '@/features/api/utils';
import prisma from '@/lib/prismadb';

export const PATCH = async (req: Request, params: IdParams) => {
  return ensureAuthenticated(async (session) => {
    const { isPublic } = await req.json();
    const document = await prisma.document.update({
      where: {
        id: params.id,
        userId: session.id,
      },
      data: {
        isPublic,
        updatedAt: new Date(),
      },
    });
    directoriesUpdate(document.parentId);
    return Response.json(document, { status: 201 });
  });
};
