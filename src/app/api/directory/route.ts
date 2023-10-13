import { directoryUpdate } from '@/lib/api';
import { authOptions } from '@/lib/authOptions';
import prisma from '@/lib/prismadb';
import { getServerSession } from 'next-auth';

export const GET = async (req: Request) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const directories = await prisma.directory.findMany({
      where: {
        userId: session.id,
      },
    });
    return Response.json(directories, { status: 201 });
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { parentId, name } = await req.json();

    const directory = await prisma.directory.create({
      data: {
        parentId,
        userId: session.id,
        name: name,
      },
    });
    directoryUpdate(directory.id);
    return Response.json(directory, { status: 201 });
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
};