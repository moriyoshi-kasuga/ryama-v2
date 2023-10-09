import bcrypt from 'bcrypt';

import prisma from '@/lib/prismadb';

// ログインAPI
export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return Response.json({ message: 'user not found' }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordValid) {
      return Response.json({ message: 'password is missing' }, { status: 401 });
    }

    return Response.json(
      { message: 'signin successful', user },
      { status: 201 },
    );
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
};
