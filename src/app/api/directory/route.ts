import { directoriesUpdate } from '@/features/api/directory';
import { ensureAuthenticated } from '@/features/api/utils';
import prisma from '@/lib/prismadb';

export const GET = async (req: Request) => {
  return ensureAuthenticated(async (session) => {
    const directories = await prisma.directory.findMany({
      where: {
        userId: session.id,
      },
    });
    return Response.json(directories, { status: 201 });
  });
};

export const POST = async (req: Request) => {
  return ensureAuthenticated(async (session) => {
    const { parentId, name } = await req.json();
    const directory = await prisma.directory.create({
      data: {
        parentId,
        userId: session.id,
        name: name,
      },
    });
    directoriesUpdate(directory.id);
    return Response.json(directory, { status: 201 });
  });
};
