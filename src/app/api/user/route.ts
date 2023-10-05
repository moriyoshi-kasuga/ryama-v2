import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';
import { getSession } from 'next-auth/react';

// POST /api/post
// Required fields in body: name
// Optional fields in body: content
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { name, content } = req.body;

  const session = await getSession({ req });

  if (session) {
    const result = await prisma.document.create({
      data: {
        name: name,
        content: content,
        user: { connect: { email: session?.user?.email! } },
      },
    });
    res.json(result);
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
}
