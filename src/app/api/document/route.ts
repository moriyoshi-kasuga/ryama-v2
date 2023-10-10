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
        user: {
          email: session.user?.email!,
        },
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
    const { directoryID, name } = await req.json();

    const document = await prisma.document.create({
      data: {
        directory: {
          connect: {
            id: directoryID,
          },
        },
        user: {
          connect: {
            email: session.user?.email!,
          },
        },
        name: name,
      },
    });

    return Response.json(document, { status: 201 });
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
};
