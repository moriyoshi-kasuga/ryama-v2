import { directoriesUpdate } from '@/features/api/directory';
import { ensureAuthenticated } from '@/features/api/utils';
import prisma from '@/lib/prismadb';

export const GET = async (req: Request) => {
  return ensureAuthenticated(async (session) => {
    const documents = await prisma.document.findMany({
      where: {
        userId: session.id,
      },
    });
    return Response.json(documents, { status: 201 });
  });
};

export const POST = async (req: Request) => {
  return ensureAuthenticated(async (session) => {
    const { parentId, name } = await req.json();
    const document = await prisma.document.create({
      data: {
        parentId,
        userId: session.id,
        name: name,
      },
    });

    directoriesUpdate(document.parentId);
    return Response.json(document, { status: 201 });
  });
};
