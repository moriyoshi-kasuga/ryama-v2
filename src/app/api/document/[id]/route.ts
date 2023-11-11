import { ensureAuthenticated } from '@/features/api/utils';
import prisma from '@/lib/prismadb';

export const GET = async (req: Request, params: IdParams) => {
  ensureAuthenticated(async (session) => {
    const document = await prisma.document.findUnique({
      where: {
        id: params.id,
        userId: session.id,
      },
    });
    if (document == null) {
      return Response.json({ message: 'Not found document' }, { status: 500 });
    }
    return Response.json(document, { status: 201 });
  });
};

export const DELETE = async (req: Request, params: IdParams) => {
  ensureAuthenticated(async (session) => {
    const document = await prisma.document.delete({
      where: {
        userId: session.id,
        id: params.id,
      },
    });
    return Response.json(document, { status: 201 });
  });
};

export const PATCH = async (req: Request, params: IdParams) => {
  ensureAuthenticated(async (session) => {
    const { name } = await req.json();
    const document = await prisma.document.update({
      where: {
        id: params.id,
        userId: session.id,
      },
      data: {
        name,
      },
    });
    return Response.json(document, { status: 201 });
  });
};
