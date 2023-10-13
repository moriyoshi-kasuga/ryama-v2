import { directoriesUpdate } from '@/features/api/directory';
import { authOptions } from '@/lib/authOptions';
import prisma from '@/lib/prismadb';
import { getServerSession } from 'next-auth';

export const GET = async (req: Request) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const documents = await prisma.document.findMany({
      where: {
        userId: session.id,
      },
    });
    return Response.json(documents, { status: 201 });
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

    const document = await prisma.document.create({
      data: {
        parentId,
        userId: session.id,
        name: name,
      },
    });
    directoriesUpdate(document.parentId);
    return Response.json(document, { status: 201 });
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
};
