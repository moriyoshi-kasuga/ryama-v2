import { directoriesUpdate } from '@/features/api/directory';
import { ensureAuthenticated } from '@/features/api/utils';
import prisma from '@/lib/prismadb';

export const GET = async (req: Request, params: IdParams) => {
  return ensureAuthenticated(async (session) => {
    const directory = await prisma.directory.findUnique({
      where: {
        id: params.id,
      },
    });
    return Response.json(directory, { status: 201 });
  });
};

export const DELETE = async (req: Request, params: IdParams) => {
  return ensureAuthenticated(async (session) => {
    const directory = await prisma.directory.delete({
      where: {
        id: params.id,
      },
    });
    directoriesUpdate(directory.id);
    return Response.json(directory, { status: 201 });
  });
};

export const PATCH = async (req: Request, params: IdParams) => {
  return ensureAuthenticated(async (session) => {
    const { name } = await req.json();
    const directory = await prisma.directory.update({
      where: {
        id: params.id,
      },
      data: {
        name,
      },
    });
    directoriesUpdate(directory.id);
    return Response.json(directory, { status: 201 });
  });
};
