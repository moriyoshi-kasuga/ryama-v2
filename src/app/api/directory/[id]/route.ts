import { directoryUpdate } from '@/lib/api';
import { authOptions } from '@/lib/authOptions';
import prisma from '@/lib/prismadb';
import { getServerSession } from 'next-auth';

export const GET = async (req: Request, params: IdParams) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const directory = await prisma.directory.findUnique({
      where: {
        id: params.id,
      },
    });
    return Response.json(directory, { status: 201 });
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
};

export const DELETE = async (req: Request, params: IdParams) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const directory = await prisma.directory.delete({
      where: {
        id: params.id,
      },
    });
    directoryUpdate(directory.id);
    return Response.json(directory, { status: 201 });
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
};

export const PATCH = async (req: Request, params: IdParams) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { name } = await req.json();
    const directory = await prisma.directory.update({
      where: {
        id: params.id,
      },
      data: {
        name,
      },
    });
    directoryUpdate(directory.id);
    return Response.json(directory, { status: 201 });
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
};
